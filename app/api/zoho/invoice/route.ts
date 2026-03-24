import { NextResponse } from "next/server";
import { getZohoOAuthToken } from "@/lib/zohoOAuth";

const ZOHO_ORG_ID = process.env.ZOHO_ORG_ID as string;

export async function POST(req: Request) {
    const json = await req.json();
    const { firstName, lastName, email, amount, stripePaymentId } = json;

    if (!firstName || !lastName || !email || !amount || !stripePaymentId) {
        return NextResponse.json({ message: "Missing required fields" });
    }

    const ZOHO_ACCESS_TOKEN = await getZohoOAuthToken();

    try {
        // 1. Try to find existing contact
        const contactListRes = await fetch(`https://www.zohoapis.com/invoice/v3/contacts?email=${encodeURIComponent(email)}`, {
            headers: {
                Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
                "X-com-zoho-invoice-organizationid": ZOHO_ORG_ID,
            },
        });

        const contactListData = await contactListRes.json();
        let contactId = contactListData.contacts?.[0]?.contact_id;

        // 2. If not found, create a new contact
        if (!contactId) {
            const contactResponse = await fetch("https://www.zohoapis.com/invoice/v3/contacts", {
                method: "POST",
                headers: {
                    Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                    "X-com-zoho-invoice-organizationid": ZOHO_ORG_ID,
                },
                body: JSON.stringify({
                    contact_name: `${firstName} ${lastName}`,
                    contact_persons: [
                        {
                            first_name: firstName,
                            last_name: lastName,
                            email,
                        },
                    ],
                }),
            });

            const contactData = await contactResponse.json();
            contactId = contactData.contact?.contact_id;

            if (!contactId) {
                return NextResponse.json({ message: "Failed to create contact", detail: contactData });
            }
        }

        // 3. Create Invoice
        const invoiceResponse = await fetch("https://www.zohoapis.com/invoice/v3/invoices", {
            method: "POST",
            headers: {
                Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
                "X-com-zoho-invoice-organizationid": ZOHO_ORG_ID,
            },
            body: JSON.stringify({
                customer_id: contactId,
                line_items: [
                    {
                        name: "Stripe Payment",
                        rate: amount,
                        quantity: 1,
                    },
                ],
            }),
        });

        const invoiceData = await invoiceResponse.json();
        const invoiceId = invoiceData.invoice?.invoice_id;

        if (!invoiceId) {
            return NextResponse.json({ message: "Failed to create invoice", detail: invoiceData });
        }

        // 4. Record Payment
        const paymentResponse = await fetch("https://www.zohoapis.com/invoice/v3/customerpayments", {
            method: "POST",
            headers: {
                Authorization: `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
                "X-com-zoho-invoice-organizationid": ZOHO_ORG_ID,
            },
            body: JSON.stringify({
                customer_id: contactId,
                payment_mode: "Stripe",
                amount,
                invoices: [
                    {
                        invoice_id: invoiceId,
                        amount_applied: amount,
                    },
                ],
                reference_number: stripePaymentId,
                date: new Date().toISOString().split("T")[0],
            }),
        });

        const paymentData = await paymentResponse.json();

        if (!paymentData.payment?.payment_id) {
            return NextResponse.json({ message: "Failed to record payment", detail: paymentData });
        }

        return NextResponse.json({ message: "Invoice and payment recorded successfully" });
    } catch (error) {
        console.error("Zoho Invoice Error:", error);
        return NextResponse.json({ message: "Internal Server Error", error });
    }
}
