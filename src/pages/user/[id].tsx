import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { prisma } from '../../prisma'

const User = ({ user }) => {
  const router = useRouter()
  const { id } = router.query

  return <p>User: {id} - {user?.name}</p>
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(ctx.params.id)
    },
    select: {
      id: true,
      name: true,
    }
  })
  return {
    props: {user},
    revalidate: 1,
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await prisma.user.findMany({})).map(({id}) => ({
    params: {id: `${id}` },
  }))
  console.log({ paths })
  return {
    paths: paths,
    fallback: true,
  }
}

export default User