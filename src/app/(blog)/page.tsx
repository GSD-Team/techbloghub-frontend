import { use } from "react";
import List from './analytics/list';

export default function Page(){
  const data = use(getData());

  console.log(data);
  return( <List data={data}/>)
}

export async function getData(){
  const res = await fetch("http://localhost:3000/api/blog", {
    // 요청이 Next.js HTTP 캐시와 상호 작용하는 방식을 구성
    cache: "no-store",
  });

  return res.json();
}