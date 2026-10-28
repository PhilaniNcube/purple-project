import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Container, Display, Eyebrow, Script, Section } from "@/components/ds";
import { ColourPurple } from "@/components/get-the-facts/colour-purple";
import { FiveCancers } from "@/components/get-the-facts/five-cancers";
import { FactsHero } from "@/components/get-the-facts/hero";
import { PalliativeCare } from "@/components/get-the-facts/palliative-care";
import { Prevention } from "@/components/get-the-facts/prevention";
import { Signs } from "@/components/get-the-facts/signs";
import { TheGoal } from "@/components/get-the-facts/the-goal";
import { Button } from "@/components/ui/button";
import { JoinUs } from "@/components/our-story/speak-up";

export const metadata: Metadata = {
  title: "Get the facts",
  description:
    "Know the signs of gynaecological cancer, understand your risk and learn how vaccination and screening can protect you.",
};

const CANCERS = [
  {
    name: "Cervical cancer",
    body: "Starts in the cervix, the lower part of the uterus. Almost all cases are linked to persistent HPV infection, which is why vaccination and screening matter so much.",
  },
  {
    name: "Ovarian cancer",
    body: "Starts in the ovaries. It is often found later because the signs — bloating, pelvic pain, feeling full quickly — can be vague.",
  },
  {
    name: "Uterine (endometrial) cancer",
    body: "Starts in the lining of the uterus. Unusual bleeding, especially after menopause, is the most common sign.",
  },
  {
    name: "Vulvar cancer",
    body: "Affects the outer part of the female genitals. Look out for a lump, sore, persistent itch or skin change that does not heal.",
  },
  {
    name: "Vaginal cancer",
    body: "Rare. It can show up as unusual bleeding, discharge or a lump inside the vagina.",
  },
];

const SIGNS = [
  "Bleeding between periods, after sex or after menopause",
  "Unusual, smelly or bloody discharge",
  "Persistent pelvic or abdominal pain",
  "Bloating that does not come and go",
  "Feeling full quickly or changes in appetite",
  "A lump, sore or skin change on the vulva",
  "Pain or bleeding when urinating, or bowel changes",
  "Unexplained weight loss or lasting tiredness",
];

const PREVENTION = [
  {
    title: "Vaccinate against HPV",
    body: "The HPV vaccine protects against the types of HPV that cause most cervical cancers. In South Africa it is offered free to girls around ages 9–12 through the school programme. Ask your clinic if you are unsure.",
  },
  {
    title: "Keep up with screening",
    body: "Cervical screening can find abnormal cells before they become cancer. A Pap smear or HPV test is quick, and your clinic can tell you when you are next due.",
  },
  {
    title: "Reduce HPV exposure",
    body: "Condoms lower the risk of HPV transmission, though they do not remove it completely. The vaccine remains the strongest protection.",
  },
  {
    title: "Know your body and your history",
    body: "Smoking raises risk, and some families carry gene changes linked to cancer. If you have a strong family history, ask your doctor what screening is right for you.",
  },
];

export default function GetTheFactsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <FactsHero />
      <FiveCancers />
      <ColourPurple />
      <Prevention />
      <Signs />
      <PalliativeCare />
      <TheGoal />
      <JoinUs />
    </main>
  );
}
