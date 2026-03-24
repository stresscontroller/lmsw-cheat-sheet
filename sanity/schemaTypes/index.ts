import { type SchemaTypeDefinition } from "sanity";

import { HomePageType } from "./homePage";
import { FreeTutoringSessionPageType } from "./freeTutoringSessionPage";
import { EnrollNowPageType } from "./enrollnow-page";
import { ThanksPageType } from "./thanks-page";
import { MyLearningPageType } from "./myLearningPage";
import { AboutUsPageType } from "./aboutPage";
import { FAQType } from "./faq";
import { LogInPageType } from "./logInPage";
import { ProductPageType } from "./mainCheatSheet";
import { MiniCheatSheet1Type } from "./miniCheatSheet1";
import { MiniCheatSheet2Type } from "./miniCheatsheet2";
import { MiniCheatSheet3Type } from "./miniCheatSheet3";
import { MiniCheatSheet4Type } from "./miniCheatSheet4";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    HomePageType,
    FreeTutoringSessionPageType,
    EnrollNowPageType,
    ThanksPageType,
    MyLearningPageType,
    AboutUsPageType,
    FAQType,
    LogInPageType,
    ProductPageType,
    MiniCheatSheet1Type,
    MiniCheatSheet2Type,
    MiniCheatSheet3Type,
    MiniCheatSheet4Type,
  ],
};
