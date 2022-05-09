// import pkg from "@prisma/client"
// const { PrismaClient } = pkg
// const prisma = new PrismaClient()
// const { user: User } = prisma

// async function main() {
//     await User.create({
//         data: {
//             name: 'Geoffrey',
//             last_name: 'Lusitano',
//             email: 'geoffrey@gmail.com',
//             password: 'Test12',
//             confirm_password: 'Test12',
//             post: {
//                 create: [
//                     {
//                         title: 'ajoue contenu',
//                         content: 'test1'
//                     },
//                     {
//                         title: 'on va voir',
//                         content: 'test2'
//                     },
//                 ]
//             }
//         }
//     })
// }

// main()
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })