import { h } from "vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

export const sortableHeader = (label: string) => {
  return ({ column }: any) =>
    h(
      Button,
      {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      },
      () => [label, h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
    );
};
