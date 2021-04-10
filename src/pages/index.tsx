import { GetServerSideProps } from "next"
import { prisma } from '../prisma'
import Link from 'next/link'

export default function Home({ users }) {
  return (
    <div>
      Home {JSON.stringify(users)}
      { users.map(user => (
        <Link href={`/user/${user.id}`} key={user.id}>{user.name}</Link>
      )) }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
    }
  })
  console.log({ users })

  return {
    props: {
      users,
    }
  }
}