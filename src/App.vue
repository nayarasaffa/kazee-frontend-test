<script setup lang="ts">
import PageHeader from "./components/custom/PageHeader.vue";
import PageHeaderDescription from "./components/custom/PageHeaderDescription.vue";
import PageHeaderHeading from "./components/custom/PageHeaderHeading.vue";

import sentiment from "@/response.json";
import DataTable from "./components/ui/table/DataTable.vue";
import { sortableHeader } from "@/components/custom/SortableHeader";

// Data for Sentiment Table
const categories = sentiment.data.all.column.categories;
const series = sentiment.data.all.column.series;

const tableData = categories.map((category, idx) => {
  const positive = series[0].data[idx];
  const neutral = series[1].data[idx];
  const negative = series[2].data[idx];
  const total = positive + neutral + negative;

  return {
    channel: category,
    positive,
    neutral,
    negative,
    total,
    percentage: ((positive / total) * 100).toFixed(1) + "%",
  };
});

const sentimentColumn = [
  {
    accessorKey: "channel",
    header: sortableHeader("Channel"),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "positive",
    header: sortableHeader("Positive"),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "neutral",
    header: sortableHeader("Neutral"),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "negative",
    header: sortableHeader("Negative"),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "total",
    header: sortableHeader("Total"),
    cell: (info) => info.getValue(),
  },
];

console.log("categories", categories);
console.log("series", series);
console.log("tableData", tableData);
console.log("sentimentColumn", sentimentColumn);
</script>

<template>
  <div class="relative px-10">
    <PageHeader>
      <PageHeaderHeading> Sentiment Analysis App </PageHeaderHeading>
      <PageHeaderDescription>
        A web application for analyzing sentiment in text.
      </PageHeaderDescription>
    </PageHeader>

    <div class="container-wrapper">
      <div class="w-full py-6">
        <div class="overflow-hidden rounded-lg border bg-background shadow">
          <div style="position: relative">
            <div>
              <div class="hidden h-full flex-1 flex-col space-y-1 p-8 md:flex">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-2xl font-bold tracking-tight">
                      Sentiment Table
                    </h2>
                    <p class="text-muted-foreground">
                      Here's a list of sentiment analysis results.
                    </p>
                  </div>
                </div>
                <DataTable :data="tableData" :columns="sentimentColumn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
