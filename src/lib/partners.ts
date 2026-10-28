/** The organisations Purple Project works alongside. */
export type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Cap at the file's native width; smaller columns still shrink it. */
  maxWidth: string;
};

export const PARTNERS: Partner[] = [
  {
    name: "Cancer Alliance",
    src: "/images/Cancer-Alliance-Logo-2%201.png",
    width: 193,
    height: 90,
    maxWidth: "max-w-[193px]",
  },
  {
    name: "Project Flamingo",
    src: "/images/project-flamingo.png",
    width: 290,
    height: 66,
    maxWidth: "max-w-[290px]",
  },
  {
    name: "CANSA — Cancer Association of South Africa",
    src: "/images/cansa-logo.png%201.png",
    width: 177,
    height: 84,
    maxWidth: "max-w-[177px]",
  },
];
