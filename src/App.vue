<script setup lang="ts">
import PageHeader from "./components/custom/PageHeader.vue";
import PageHeaderDescription from "./components/custom/PageHeaderDescription.vue";
import PageHeaderHeading from "./components/custom/PageHeaderHeading.vue";

import sentiment from "@/response.json";
import DataTable from "./components/ui/table/DataTable.vue";
import DataChart from "./components/ui/chart-donut/DataChart.vue";
import { sortableHeader } from "@/components/custom/SortableHeader";
import { labels } from "@unovis/ts/components/timeline/style";

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

// Data for Sentiment Chart
interface ChartSeries {
  labels: string[];
  series: number[];
}

function prepareDonutData(apiData: any): Record<string, ChartSeries> {
  const result: Record<string, ChartSeries> = {};

  for (const channel in apiData.data) {
    if (apiData.data[channel].pie) {
      const pie = apiData.data[channel].pie;
      result[channel] = {
        labels: pie.categories,
        series: pie.series,
      };
    }
  }

  return result;
}

const donutChartData = prepareDonutData(sentiment);
// console.log(donutChartData);
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
              <div class="h-full flex-1 flex-col space-y-1 p-8">
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

    <div class="container-wrapper">
      <div class="w-full py-6">
        <div class="overflow-hidden rounded-lg border bg-background shadow">
          <div style="position: relative">
            <div>
              <div class="h-full flex-1 flex-col space-y-5 p-8">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-2xl font-bold tracking-tight">
                      Sentiment Chart
                    </h2>
                    <p class="text-muted-foreground">
                      Here's a Chart of sentiment analysis results.
                    </p>
                  </div>
                </div>
                <DataChart :chart-data="donutChartData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
