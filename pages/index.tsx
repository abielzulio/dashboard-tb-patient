import type { NextPage } from "next"
import { useState, useEffect } from "react"
import { Area } from "@ant-design/plots"

const Home: NextPage = () => {
  interface Data {
    month: string
    value: number
  }
  const amplitudo_data: Data[] = [
    {
      month: "JAN",
      value: 80,
    },
    {
      month: "FEB",
      value: 90,
    },
    {
      month: "MAR",
      value: 92,
    },
    {
      month: "APR",
      value: 100,
    },
    {
      month: "MEI",
      value: 110,
    },
    {
      month: "JUN",
      value: 112,
    },
  ]
  const signal_long_data: Data[] = [
    {
      month: "JAN",
      value: 60,
    },
    {
      month: "FEB",
      value: 63,
    },
    {
      month: "MAR",
      value: 71,
    },
    {
      month: "APR",
      value: 75,
    },
    {
      month: "MEI",
      value: 78,
    },
    {
      month: "JUN",
      value: 80,
    },
  ]
  const peak_freq_data: Data[] = [
    {
      month: "JAN",
      value: 93,
    },
    {
      month: "FEB",
      value: 98,
    },
    {
      month: "MAR",
      value: 100,
    },
    {
      month: "APR",
      value: 101,
    },
    {
      month: "MEI",
      value: 105,
    },
    {
      month: "JUN",
      value: 108,
    },
  ]
  const intermodulation_distortion_data: Data[] = [
    {
      month: "JAN",
      value: 110,
    },
    {
      month: "FEB",
      value: 113,
    },
    {
      month: "MAR",
      value: 118,
    },
    {
      month: "APR",
      value: 123,
    },
    {
      month: "MEI",
      value: 131,
    },
    {
      month: "JUN",
      value: 132,
    },
  ]
  const body_weight_data: Data[] = [
    {
      month: "JAN",
      value: 70,
    },
    {
      month: "FEB",
      value: 70.5,
    },
    {
      month: "MAR",
      value: 70.5,
    },
    {
      month: "APR",
      value: 70.75,
    },
    {
      month: "MEI",
      value: 70.8,
    },
    {
      month: "JUN",
      value: 71,
    },
  ]
  const bmi_data: Data[] = [
    {
      month: "JAN",
      value: 22,
    },
    {
      month: "FEB",
      value: 22.3,
    },
    {
      month: "MAR",
      value: 22.5,
    },
    {
      month: "APR",
      value: 22.5,
    },
    {
      month: "MEI",
      value: 22.6,
    },
    {
      month: "JUN",
      value: 22.6,
    },
  ]
  const lung_data: Data[] = [
    {
      month: "JAN",
      value: 40,
    },
    {
      month: "FEB",
      value: 45,
    },
    {
      month: "MAR",
      value: 48,
    },
    {
      month: "APR",
      value: 50,
    },
    {
      month: "MEI",
      value: 80,
    },
    {
      month: "JUN",
      value: 100,
    },
  ]

  const DemoArea = ({
    data,
    title,
    units,
  }: {
    data: any
    title: string
    units?: string
  }) => {
    /*     const [data, setData] = useState([]) */

    /*     useEffect(() => {
      asyncFetch()
    }, []) */

    /*     const asyncFetch = () => {
      fetch(
        "https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json"
      )
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log("fetch data failed", error)
        })
    } */
    const config = {
      data,
      xField: "month",
      yField: "value",
      height: 200,
      autoFit: true,
      xAxis: {
        range: [0, 1],
      },
      color: "#30A46C",
      areaStyle: () => {
        return {
          fill: "l(270) 0:#ffffff 0.5:#DDF3E4 1:#30A46C",
        }
      },
    }

    return (
      <div className="h-fit w-full rounded-md p-[18px] border-[#E8E8E8] border-[1px] gap-[20px] flex flex-col">
        <h1 className="text-black text-left font-semibold">{title}</h1>
        <div className="flex gap-[10px] items-end">
          <p className="text-black text-left text-[48px] font-semibold font-mono tracking-tighter">
            {data[data.length - 1].value}
          </p>
          {units && (
            <p className="text-[#8F8F8F] font-semibold mb-[12px]">{units}</p>
          )}
        </div>
        <Area {...config} />
      </div>
    )
  }
  const [showCount, setShowCount] = useState<number>(6)
  const handleDecrement = () => {
    if (showCount !== 2) {
      setShowCount(showCount - 1)
    }
  }
  const handleIncrement = () => {
    if (showCount !== 6) {
      setShowCount(showCount + 1)
    }
  }
  return (
    <section className="min-w-screen min-h-screen py-[30px] gap-[30px] flex flex-col bg-white">
      <div className="gap-[20px] flex flex-col px-[24px]">
        <div className="flex justify-between">
          <h2 className="text-black text-[24px] font-semibold">Wicara</h2>
          <div className="flex gap-[10px] text-black text-[24px]">
            <button
              onClick={() => handleDecrement()}
              disabled={showCount === 2}
              style={{
                opacity: showCount === 2 ? 0.5 : 1,
              }}
            >
              ←
            </button>
            <button
              onClick={() => handleIncrement()}
              disabled={showCount === 6}
              style={{
                opacity: showCount === 6 ? 0.5 : 1,
              }}
            >
              →
            </button>
          </div>
        </div>
        <div className="gap-[30px] grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
          <DemoArea
            data={amplitudo_data.slice(0, showCount)}
            title="Amplitudo"
            units="Hz"
          />
          <DemoArea
            data={signal_long_data.slice(0, showCount)}
            title="Panjang sinyal"
            units="Hz"
          />
          <DemoArea
            data={peak_freq_data.slice(0, showCount)}
            title="Puncak frekuensi"
            units="Hz"
          />
          <DemoArea
            data={intermodulation_distortion_data.slice(0, showCount)}
            title="Intermodulasi distorsi"
            units="Hz"
          />
        </div>
      </div>
      <div className="gap-[20px] flex flex-col px-[24px]">
        <h2 className="text-black text-[24px] font-semibold">Wicara</h2>
        <div className="gap-[30px] grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <DemoArea
            data={body_weight_data.slice(0, showCount)}
            title="Berat badan"
            units="kg"
          />
          <DemoArea
            data={bmi_data.slice(0, showCount)}
            title="Indeks massa tubuh"
          />
          <DemoArea
            data={lung_data.slice(0, showCount)}
            title="Luas paru non-bercak"
            units="%"
          />
        </div>
      </div>
    </section>
  )
}

export default Home
