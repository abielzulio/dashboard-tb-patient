import { Area } from "@ant-design/plots"
import { Segmented } from "antd"
import { SegmentedValue } from "antd/es/segmented"
import {
  amplitudo_data,
  bmi_data,
  body_weight_data,
  breath_data,
  intermodulation_distortion_data,
  lung_data,
  peak_freq_data,
  signal_length_data,
} from "data/data"
import type { NextPage } from "next"
import { useState } from "react"
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
    range,
    changePosition = "column",
  }: {
    data: any[]
    title: string
    units?: string
    selectedMonth: number
    inverse?: boolean
    range?: {
      min: number
      max: number
    }
    changePosition?: "row" | "column"
  }) => {
    const PADDING_NUMBER: number = 10
    const MAX_VALUE: number = Math.max(...data.map((d: Data) => d.value))
    const MIN_VALUE: number = Math.min(...data.map((d: Data) => d.value))
    const RANGE_N_MONTH_VALUE: number =
      data[selectedMonth - 1].value - data[0].value

    const isSecondMonthAvailable: boolean = data.length > 1
    const isUptrend: boolean =
      selectedMonth > 1 &&
      data[selectedMonth - 1].value > data[selectedMonth - 2].value
        ? true
        : false

    const isStable: boolean =
      selectedMonth > 1 &&
      data[selectedMonth - 1].value === data[selectedMonth - 2].value

    const isBetterThanTheFirstMonth: boolean =
      RANGE_N_MONTH_VALUE > 0
        ? inverse
          ? false
          : true
        : inverse
        ? true
        : false

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
          min: range?.min ?? MIN_VALUE - PADDING_NUMBER / 2,
          max: range?.max ?? MAX_VALUE + PADDING_NUMBER,
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
      <div className="h-fit w-full rounded-md p-[18px] border-[#E8E8E8] bg-white shadow-md border-[1px] gap-[10px] flex flex-col">
        <h1 className="text-[#595B6B] text-left font-semibold">{title}</h1>
        <div
          className="flex justify-between gap-[0px] mb-[10px] -mt-[10px]"
          style={{ flexDirection: changePosition }}
        >
          <div className="flex gap-[8px] items-start -ml-[3px]">
            <p className="text-black text-left text-[48px] font-semibold font-mono tracking-tighter">
              {data[selectedMonth - 1].value}
            </p>
            {units && (
              <p className="text-[#8F8F8F] font-semibold mt-[12px]">{units}</p>
            )}
          </div>
          {isSecondMonthAvailable && selectedMonth > 1 && (
            <div className="flex flex-row items-start text-black gap-[30px] mt-[5px]">
              <div className="flex items-start gap-[10px]">
                {!isStable && (
                  <span
                    className="px-[5px] rounded-full text-[12px]"
                    style={{
                      color: TREND_COLOR_FILL_PRIMARY,
                      background: TREND_COLOR_FILL_SECONDARY,
                    }}
                  >
                    {isUptrend ? "???" : "???"}
                  </span>
                )}
                <div className="flex flex-col -mt-[5px]">
                  <p
                    className="font-semibold"
                    style={{ color: TREND_COLOR_FILL_PRIMARY }}
                  >
                    {!isStable &&
                      Math.abs(
                        data[selectedMonth - 1].value -
                          data[selectedMonth - 2].value
                      )
                        .toString()
                        .substring(0, 5)}
                    {isStable && "0"}
                    {units && ` ${units}`}
                  </p>
                  <p className="text-[12px] opacity-50 -mt-[2px]">bulan lalu</p>
                </div>
              </div>
              {RANGE_N_MONTH_VALUE !== 0 && (
                <div className="flex items-start gap-[10px]">
                  <span
                    className="px-[5px] rounded-full text-[12px]"
                    style={{
                      color: isBetterThanTheFirstMonth
                        ? color.green.primary
                        : color.red.primary,
                      background: isBetterThanTheFirstMonth
                        ? color.green.secondary
                        : color.red.secondary,
                    }}
                  >
                    {isBetterThanTheFirstMonth
                      ? inverse
                        ? "???"
                        : "???"
                      : inverse
                      ? "???"
                      : "???"}
                  </span>
                  <div className="flex flex-col -mt-[5px]">
                    <p
                      className="font-semibold"
                      style={{
                        color: isBetterThanTheFirstMonth
                          ? color.green.primary
                          : color.red.primary,
                      }}
                    >
                      {Math.abs(data[selectedMonth - 1].value - data[0].value)
                        .toString()
                        .substring(0, 5)}
                      {units && ` ${units}`}
                    </p>
                    <p className="text-[12px] opacity-50 -mt-[2px]">
                      awal bulan
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {selectedMonth > 1 ? (
          <>
            <Area {...config} />
          </>
        ) : (
          <p className="text-sm text-center w-full text-black opacity-30 pb-[20px] pt-[0px] px-[15px]">
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

  const month_range = signal_length_data.map(({ month }, id) => ({
    value: id + 1,
    label: month,
  }))

  console.log(month_range)

  return (
    <>
      <div className="fixed bottom-[20px] border-[#E8E8E8] border-[1px] rounded-xl w-fit h-fit z-20 py-[10px] px-[10px] flex bg-[#fafcfe] text-black justify-center left-0 right-0 mx-auto">
        {selectedMonth > 1 && (
          <button
            onClick={() => handleDecrement()}
            disabled={selectedMonth === 1}
            className="px-[8px] mr-[10px] hover:bg-[#f5f5f5] rounded-md transition"
            style={{
              opacity: selectedMonth === 1 ? 0.3 : 1,
              cursor: selectedMonth === 1 ? "not-allowed" : "pointer",
            }}
          >
            ???
          </button>
        )}
        <Segmented
          options={month_range}
          value={selectedMonth}
          defaultValue={selectedMonth}
          onChange={(value: SegmentedValue) =>
            setSelectedMonth(value as number)
          }
          onResize={undefined}
          onResizeCapture={undefined}
          color="dark"
          className="border-[#E8E8E8] border-[1px]"
        />
        {selectedMonth < 6 && (
          <button
            onClick={() => handleIncrement()}
            disabled={selectedMonth === 6}
            className="px-[8px] ml-[10px] hover:bg-[#f5f5f5] rounded-md transition"
            style={{
              opacity: selectedMonth === 6 ? 0.3 : 1,
              cursor: selectedMonth === 6 ? "not-allowed" : "pointer",
            }}
          >
            ???
          </button>
        )}
      </div>
      <section className="min-w-screen min-h-screen pt-[30px] pb-[100px] gap-[30px] flex flex-col bg-[#f9fbfd] px-[24px]">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
          <div className="grid sm:grid-cols-2 grid-cols-1">
            <div className="flex flex-col gap-[5px] text-black">
              <h1 className="text-left font-bold text-[32px]">Dashboard</h1>
              <p className="text-left font-mono font-medium text-[14px]">
                MD29192NADA
              </p>
            </div>
            <div className="flex flex-row justify-between md:mt-[10px] w-full">
              <div className="flex flex-col">
                <p className="uppercase text-[#8F8F8F] text-[12px] font-semibold">
                  Umur
                </p>
                <h1 className="text-black text-left font-semibold">24</h1>
              </div>
              <div className="flex flex-col">
                <p className="uppercase text-[#8F8F8F] text-[12px] font-semibold">
                  Kelamin
                </p>
                <h1 className="text-black text-left font-semibold">P</h1>
              </div>
              <div className="flex flex-col">
                <p className="uppercase text-[#8F8F8F] text-[12px] font-semibold">
                  Tinggi
                </p>
                <h1 className="text-black text-left font-semibold">170</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-[10px] flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-black text-[20px] font-semibold">Wicara</h2>
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
        <div className="gap-[10px] flex flex-col">
          <h2 className="text-black text-[20px] font-semibold">Fisiologis</h2>
          <div className="gap-[30px] grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
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
            <LineArea
              data={breath_data}
              title="Skala sesak"
              selectedMonth={selectedMonth}
              range={{ min: 0, max: 4 }}
              inverse
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
