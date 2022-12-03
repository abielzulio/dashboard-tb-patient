import { Area } from "@ant-design/plots"
import { Segmented } from "antd"
import { SegmentedValue } from "antd/es/segmented"
import type { NextPage } from "next"
import { useState } from "react"
import {
  amplitudo_data,
  signal_length_data,
  intermodulation_distortion_data,
  body_weight_data,
  bmi_data,
  lung_data,
  peak_freq_data,
} from "data/data"

import { Data } from "types"

const MONTHS: string[] = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MEI",
  "JUN",
  "JUL",
  "AGT",
  "SEP",
  "OKT",
  "NOV",
  "DES",
]

const Home: NextPage = () => {
  /*   const master_data = [
    {
      month: 1,
      speech: {
        amplitudo: 80,
        signal_length: 60,
        peak_frequency: 93,
        intermodulation_distortion: 110,
      },
      physiology: {
        body_weight: 80,
        body_height: 60,
        lesi: 93,
      },
    },
  ] */

  const LineArea = ({
    data,
    title,
    units,
    selectedMonth,
    inverse,
  }: {
    data: any
    title: string
    units?: string
    selectedMonth: number
    inverse?: boolean
  }) => {
    const PADDING_NUMBER: number = 20
    const MAX_VALUE: number = Math.max(...data.map((d: Data) => d.value))
    const MIN_VALUE: number = Math.min(...data.map((d: Data) => d.value))

    const isSecondMonthAvailable: boolean = data.length > 1
    const isUptrend: boolean =
      selectedMonth > 1 &&
      data[selectedMonth - 1].value > data[selectedMonth - 2].value
        ? true
        : false

    const isDowntrend: boolean =
      selectedMonth > 1 &&
      data[selectedMonth - 1].value < data[selectedMonth - 2].value
        ? true
        : false

    const isStable: boolean =
      selectedMonth > 1 &&
      data[selectedMonth - 1].value === data[selectedMonth - 2].value

    const color = {
      grey: {
        primary: "#6F6F6F",
        secondary: "#E8E8E8",
      },
      green: {
        primary: "#30A46C",
        secondary: "#DDF3E4",
      },
      red: {
        primary: "#E54C2E",
        secondary: "#FFE6E2",
      },
    }

    const TREND_COLOR_FILL_PRIMARY: string = isStable
      ? color.grey.primary
      : isUptrend
      ? inverse
        ? color.red.primary
        : color.green.primary
      : inverse
      ? color.green.primary
      : color.red.primary

    const TREND_COLOR_FILL_SECONDARY: string = isStable
      ? color.grey.secondary
      : isUptrend
      ? inverse
        ? color.red.secondary
        : color.green.secondary
      : inverse
      ? color.green.secondary
      : color.red.secondary

    const config = {
      data,
      xField: "month",
      yField: "value",
      height: 200,
      autoFit: true,
      xAxis: {
        range: [0, 1],
      },
      meta: {
        value: {
          min: MIN_VALUE - PADDING_NUMBER / 2,
          max: MAX_VALUE + PADDING_NUMBER,
        },
      },
      tooltip: {
        showMarkers: true,
      },
      annotations: [
        {
          type: "line",
          start: ["min", data[0].value],
          end: ["max", data[0].value],
          style: {
            lineWidth: 2,
            stroke: TREND_COLOR_FILL_PRIMARY,
            opacity: 0.8,
            lineDash: [2, 2],
          },
        },
        {
          type: "line",
          start: [MONTHS[selectedMonth - 1], "min"],
          end: [MONTHS[selectedMonth - 1], "max"],
          style: {
            lineWidth: 1,
            stroke: TREND_COLOR_FILL_PRIMARY,
            opacity: 0.5,
          },
        },
        {
          type: "dataMarker",
          position: [
            data[selectedMonth - 1]?.month,
            data[selectedMonth - 1]?.value,
          ],
          line: {
            length: 0,
          },
          point: {
            style: {
              fill: TREND_COLOR_FILL_SECONDARY,
              stroke: TREND_COLOR_FILL_PRIMARY,
            },
          },
          autoAdjust: false,
        },
      ] as any,
      color: TREND_COLOR_FILL_PRIMARY,
      areaStyle: () => {
        return {
          fill: `l(270) 0:#ffffff 0.5:${TREND_COLOR_FILL_PRIMARY} 1:${TREND_COLOR_FILL_PRIMARY}`,
        }
      },
      animation: {
        appear: {
          animation: "path-in",
          duration: 1000,
        },
      },
    }

    return (
      <div className="h-fit w-full rounded-md p-[18px] border-[#E8E8E8] border-[1px] gap-[10px] flex flex-col">
        <h1 className="text-black text-left font-semibold">{title}</h1>
        <div className="flex flex-col gap-[0px] mb-[10px]">
          <div className="flex gap-[10px] items-start">
            <p className="text-black text-left text-[48px] font-semibold font-mono tracking-tighter">
              {data[selectedMonth - 1].value}
            </p>
            {units && (
              <p className="text-[#8F8F8F] font-semibold mt-[12px]">{units}</p>
            )}
          </div>
          {isSecondMonthAvailable && selectedMonth > 1 && (
            <div className="flex flex-col items-start text-black">
              <div className="flex justify-center items-center gap-[5px]">
                <p
                  className="font-semibold"
                  style={{ color: TREND_COLOR_FILL_PRIMARY }}
                >
                  {!isStable
                    ? ((isUptrend && "↑") || (isDowntrend && "↓")) +
                      " " +
                      (
                        data[selectedMonth - 1].value -
                        data[selectedMonth - 2].value
                      )
                        .toString()
                        .substring(0, 5)
                    : "+0"}
                  {units && ` ${units}`}
                </p>
                <p className="text-[12px] opacity-50">dari bulan lalu</p>
              </div>
              <div className="flex justify-center items-center gap-[5px]">
                <p
                  className="font-semibold"
                  style={{ color: TREND_COLOR_FILL_PRIMARY }}
                >
                  {!isStable
                    ? ((isUptrend && "↑") || (isDowntrend && "↓")) +
                      " " +
                      (data[selectedMonth - 1].value - data[0].value)
                        .toString()
                        .substring(0, 5)
                    : "+0"}
                  {units && ` ${units}`}
                </p>
                <p className="text-[12px] opacity-50">dari bulan pertama</p>
              </div>
            </div>
          )}
        </div>
        {selectedMonth > 1 ? (
          <Area {...config} />
        ) : (
          <p className="text-sm text-center w-full text-black opacity-30 py-[30px] px-[15px]">
            Grafik akan muncul setelah data bulan kedua tersedia
          </p>
        )}
      </div>
    )
  }
  const [selectedMonth, setSelectedMonth] = useState<number>(5)
  const handleDecrement = () => {
    if (selectedMonth !== 1) {
      setSelectedMonth(selectedMonth - 1)
    }
  }
  const handleIncrement = () => {
    if (selectedMonth !== 6) {
      setSelectedMonth(selectedMonth + 1)
    }
  }
  return (
    <>
      <div className="fixed bottom-[20px] rounded-xl w-fit h-fit z-10 py-[10px] px-[15px] flex bg-white text-black justify-center md:gap-[20px] gap-[15px] left-0 right-0 mx-auto drop-shadow-xl">
        <button
          onClick={() => handleDecrement()}
          disabled={selectedMonth === 1}
          style={{
            opacity: selectedMonth === 1 ? 0.5 : 1,
          }}
        >
          ←
        </button>
        <Segmented
          options={signal_length_data.map((item, id) => id + 1)}
          value={selectedMonth}
          onChange={(value: SegmentedValue) =>
            setSelectedMonth(value as number)
          }
          onResize={undefined}
          onResizeCapture={undefined}
          color="dark"
        />
        <button
          onClick={() => handleIncrement()}
          disabled={selectedMonth === 6}
          style={{
            opacity: selectedMonth === 6 ? 0.5 : 1,
          }}
        >
          →
        </button>
      </div>
      <section className="min-w-screen min-h-screen pt-[30px] pb-[80px] gap-[30px] flex flex-col bg-white">
        <div className="gap-[20px] flex flex-col px-[24px]">
          <div className="flex justify-between">
            <h2 className="text-black text-[24px] font-semibold">Wicara</h2>
          </div>
          <div className="gap-[30px] grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
            <LineArea
              data={amplitudo_data}
              title="Amplitudo"
              units="Hz"
              selectedMonth={selectedMonth}
            />
            <LineArea
              data={signal_length_data}
              title="Panjang sinyal"
              selectedMonth={selectedMonth}
            />
            <LineArea
              data={peak_freq_data}
              title="Puncak frekuensi"
              units="Hz"
              selectedMonth={selectedMonth}
            />
            <LineArea
              data={intermodulation_distortion_data}
              title="Intermodulasi distorsi"
              selectedMonth={selectedMonth}
            />
          </div>
        </div>
        <div className="gap-[20px] flex flex-col px-[24px]">
          <h2 className="text-black text-[24px] font-semibold">Fisiologis</h2>
          <div className="gap-[30px] grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <LineArea
              data={body_weight_data}
              title="Berat badan"
              units="kg"
              selectedMonth={selectedMonth}
            />
            <LineArea
              data={bmi_data}
              title="Indeks massa tubuh"
              selectedMonth={selectedMonth}
            />
            <LineArea
              data={lung_data}
              title="Luas lesi infeksi"
              units="%"
              selectedMonth={selectedMonth}
              inverse
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
