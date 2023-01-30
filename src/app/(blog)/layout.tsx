import styles from '@/app/page.module.css'
export default function Layout({children}: {
  children: React.ReactNode
}){
  return (
    <main className={styles.main}>{children}</main>
  )
}