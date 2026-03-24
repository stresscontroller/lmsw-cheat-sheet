"use client";
import React, { useState, useRef } from "react";
import { Button, Checkbox, DatePicker, Input, Link, Select, SelectItem, Textarea } from "@heroui/react";
import { DateValue } from "@internationalized/date";
import { useRouter } from 'next/navigation'

import { ShowAlert } from "@/components/alert";
import { pushToDataLayer } from '@/lib/gtm'

interface BookingMeetingFormProps {
  leadStatus: string;
}

export default function BookingMeetingForm(props: BookingMeetingFormProps) {
  const router = useRouter();

  const [date, setDate] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const jsonFormData = JSON.parse(JSON.stringify(formData));

    const res = await fetch(`/api/schedule-meeting?email=${jsonFormData.Email}&type=${props.leadStatus === 'Lead Sign Up' ? 'free' : 'paid'}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.isScheduled) {
      ShowAlert({
        message: "You can only schedule a meeting once and you have already scheduled a meeting.",
        type: "warning"
      })
    } else {
      await fetch("/api/schedule-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: jsonFormData.Email, type: props.leadStatus === 'Lead Sign Up' ? 'free' : 'paid' }),
      });
      const res = await fetch("/api/zoho/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          zf_referrer_name: jsonFormData.zf_referrer_name,
          zf_redirect_url: jsonFormData.zf_redirect_url,
          zc_gad: jsonFormData.zc_gad,
          Name_First: jsonFormData.Name_First,
          Name_Last: jsonFormData.Name_Last,
          Email: jsonFormData.Email,
          PhoneNumber_countrycode: jsonFormData.PhoneNumber_countrycode,
          Date: jsonFormData.Date,
          DateTime_date: jsonFormData.Date,
          DateTime_hours: "00",
          DateTime_minutes: "00",
          MultiLine: jsonFormData.MultiLine,
          Dropdown: jsonFormData.Dropdown,
          Dropdown1: jsonFormData.Dropdown1,
        }).toString(),
      });
      if (res.status === 200) {
        pushToDataLayer('lead')
        pushToDataLayer('purchase', { conversionValue: 0 })
        router.push("/thank-you");
      }
    }
    setSubmitting(false);
  };

  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      const dayStr = String(date.day).padStart(2, '0');
      const yearStr = String(date.year);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthAbbr = monthNames[date.month - 1];
      setDate(`${dayStr}-${monthAbbr}-${yearStr}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="form"
      id="form"
      className="flex flex-col gap-4 w-[500px]"
    >
      <input type="hidden" name="zf_referrer_name" value="" />
      <input type="hidden" name="zf_redirect_url" value="" />
      <input type="hidden" name="zc_gad" value="" />
      <Input label="First Name" type="text" name="Name_First" size="sm" radius="full" isRequired />
      <Input label="Last Name" type="text" name="Name_Last" size="sm" radius="full" isRequired />
      <Input label="Email" type="email" name="Email" size="sm" radius="full" isRequired />
      <Input label="Phone Number" type="text" name="PhoneNumber_countrycode" id="international_PhoneNumber_countrycode" size="sm" radius="full" isRequired />
      <div className="">
        <DatePicker label="LMSW Exam Date" size="sm" radius="full" isRequired onChange={handleDateChange} />
        <input
          type="hidden"
          name="Date"
          id="Date"
          value={date ? date : ''}
        />
      </div>
      {/* <Select label="Preferred Tutoring Time (EST)" id="DateTime_hours" name="DateTime_hours" size="sm" radius="full" isRequired>
        <SelectItem key="9">9 AM</SelectItem>
        <SelectItem key="10">10 AM</SelectItem>
        <SelectItem key="11">11 AM</SelectItem>
        <SelectItem key="14">2 PM</SelectItem>
        <SelectItem key="15">3 PM</SelectItem>
        <SelectItem key="16">4 PM</SelectItem>
        <SelectItem key="17">5 PM</SelectItem>
      </Select> */}
      <Textarea label="Exam History" id="MultiLine" name="MultiLine" radius="full" isRequired rows={5} />
      <div className="">
        <select
          className="hidden"
          name="Dropdown"
          defaultValue="Tutor Form"
        >
          <option value="Tutor Form">
            Lead Source
          </option>
        </select>
        <select
          className="hidden"
          name="Dropdown1"
          defaultValue={props.leadStatus}
        >
          <option value={props.leadStatus}>
            Lead Status
          </option>
        </select>
      </div>
      <Button
        type="submit"
        color="secondary"
        radius="full"
        className="text-md"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
