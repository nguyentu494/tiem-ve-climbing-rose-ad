"use client"

import { redirect } from "next/navigation";
import useCounterStore from "src/store/store";

export default function Home() {
  // get count value from store
  const count = useCounterStore((state) => state.count);

  // action from store
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Giá trị đếm: {count}</h1>
      <button onClick={increase}>Tăng</button>
      <button onClick={decrease}>Giảm</button>
      <button onClick={reset}>Đặt lại</button>
    </div>
  );
}
