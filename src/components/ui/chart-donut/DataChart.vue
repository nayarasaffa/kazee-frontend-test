<script setup lang="ts">
import { ref, computed } from "vue";
import { DonutChart } from "@/components/ui/chart-donut";
import CustomChartTooltip from "@/components/ui/chart-donut/CustomChartTooltip.vue";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const props = defineProps<{
  chartData: Record<string, { labels: string[]; series: number[] }>;
}>();

const selected = ref("all");
const dropdownOptions = computed(() => Object.keys(props.chartData));
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const sentimentColors: Record<string, string> = {
  Positive: "#3EC764",
  Neutral: "#B3B6C6",
  Negative: "#ED3E3E",
};

const donutData = computed(() => {
  const current = props.chartData[selected.value];
  if (!current) return [];
  return current.labels.map((label, i) => ({
    name: label,
    value: current.series[i],
    color: sentimentColors[label] || "#000000",
  }));
});

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <div class="w-full">
    <div class="mb-4 flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="outline"
            class="flex items-center justify-between w-55"
          >
            {{ capitalize(selected) }}
            <ChevronDown class="ml-2 h-4 w-4 text-black" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              v-for="option in dropdownOptions"
              :key="option"
              @click="selected = option"
            >
              <span>{{ capitalize(option) }}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <DonutChart
    index="name"
    :category="'value'"
    :data="donutData"
    :custom-tooltip="CustomChartTooltip"
  />
</template>
