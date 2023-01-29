import CustomAppBar from "@/app/(blog)/analytics/appBar";

export default function Layout({children}: {
  children: React.ReactNode
}){
  return (
    <>
      <CustomAppBar />
      <main>{children}</main>
    </>
  )
}