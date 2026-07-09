import dontenv from "dotenv"
import path from "path"

dontenv.config({
    path: path.join(process.cwd() , ".env")
})

export default {
    port : process.env.PORT || 5000,
    database : process.env.DATABASE_URL,
    app_url : process.env.APP_URL,
    bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret : process.env.JWT_ACCESS_SCERET!,
    jwt_refresh_secret : process.env.JWT_REFRES_SCERET!,
    jwt_access_expires_in : process.env.JWT_ACCESS_EXPIERS_IN!,
    jwt_refresh_expires_in : process.env.JWT_REFRES_EXPIERS_IN!,
    stripe_product_price_Id : process.env.STRIPE_PRODUCT_PRICE_ID!,
    stripe_secret_key : process.env.STRIPE_SECRET_KEY!,
    stripe_webhook_secret : process.env.STRIPE_WEBHOOK_SECTRET!
}