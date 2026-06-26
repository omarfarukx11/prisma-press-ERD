import app from "./app"
import config from "./config"
import { prisma } from "./lib/prisma"

const port = config.port

async function main() {
    try {
        await prisma.$connect();
        console.log("connected to database successfully")
        app.listen(port, () => {
          console.log(`server is running on 5000 port`)
        })
    } catch (error) {
        console.log("error staring the sever ", error)
        await prisma.$disconnect();
        process.exit(1)
    }
}
main()