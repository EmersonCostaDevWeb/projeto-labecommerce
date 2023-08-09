import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex"
import { Product, ProductDB, Purchase, User, UserDB } from "./types"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const userData: UserDB[] = await db("users")

        const response: User[] = userData.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: user.created_at
            }
        })

        res.status(200).send(response)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.post("/users", async (req: Request, res: Response) => {
    try {

        const { id, name, email, password } = req.body
        if (!id || !name || !email || !password) {
            throw new Error("Forneça as informações necessarias: id, name, email, password")
        }
        if (typeof id !== "string" || typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new Error("tipos do Id, name, email, password precisam ser string")
        }
        const [idExists] = await db("users").where({ id })
        if (idExists) {
            throw new Error("id já cadastrado")
        }

        const [emailExists] = await db("users").where({ email })

        if (emailExists) {
            throw new Error("email já cadastro")
        }
        const newUser: User = {
            id,
            name,
            email,
            password

        }
        await db("users").insert(newUser)
        res.status(201).send({ message: "Cadastro realizado com sucesso" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.get("/products", async (req: Request, res: Response) => {
    try {
        const name: string = req.query.name as string
        let data: ProductDB[];

        if (name) {
            data = await db("products").whereLike("name", `%${name}%`)
        } else {
            data = await db("products")
        }

        const response: Product[] = data.map((prod) => {
            return {
                id: prod.id,
                name: prod.name,
                price: prod.price,
                description: prod.description,
                imageUrl: prod.image_url
            }
        })
        res.status(200).send(response)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl }: Product = req.body

        if (!id || !name || !price || !description || !imageUrl) {
            throw new Error("é necessario passar as informações id, name, price, description, imageUrl")
        }
        if (typeof id !== "string" || typeof name !== "string" || typeof price !== "number" || typeof description !== "string" || typeof imageUrl !== "string") {
            throw new Error("Id, name, description e imageUrl devem ser string. Price tem que ser do tipo number ")
        }
        const [idExists] = await db("products").where({ id })
        if (idExists) {
            throw new Error("id já cadastrado")
        }
        const newProduct: ProductDB = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }
        await db("products").insert(newProduct)
        res.status(201).send({ message: "Produto cadastrado com sucesso!" })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idtoEdit: string = req.params.id
        const { id, name, price, description, imageUrl }: Product = req.body
        if (id) {
            if (typeof id !== "string") {
                throw new Error("id precisa ser do tipo string")
            }
        }
        if (name) {
            if (typeof name !== "string") {
                throw new Error("name precisa ser do tipo string")
            }
        }
        if (price) {
            if (typeof price !== "number")
                throw new Error("number precisa ser do tipo string")
        }
        if (description) {
            if (typeof description !== "string") {
                throw new Error("description precisa ser do tipo string")
            }
        }
        if (imageUrl) {
            if (typeof imageUrl !== "string") {
                throw new Error("imageUrl precisa ser do tipo string")
            }
        }
        const [productToEdit]: ProductDB[] = await db("products").where({ id: idtoEdit })
        if (!productToEdit) {
            throw new Error("id inválido")
        }
        const newProduct: ProductDB = {
            id: id || productToEdit.id,
            name: name || productToEdit.name,
            price: price || productToEdit.price,
            description: description || productToEdit.description,
            image_url: imageUrl || productToEdit.image_url
        }
        await db("products").update(newProduct).where({ id: idtoEdit })
        res.status(200).send({ message: "Produto atualizado com sucesso" })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idExist] = await db("purchases").where({ id })

        if (!idExist) {
            throw new Error("id da compra é inválido")
        }
        const purchaseResponse = await db("purchases as pur")
            .select
            ("pur.id AS purchaseId",
                "u.id AS buyerId",
                "u.name AS buyerName",
                "u.email AS buyerEmail",
                "pur.total_price AS totalprice",
                "pur.created_at AS createdAt"
            )
            .innerJoin("users AS u", "u.id", "=", "pur.buyer")
            .where("pur.id", "=", id)

        const productResponse = await db("products AS prod")
            .select(
                "prod.id AS id",
                "prod.name AS name",
                "prod.price AS price",
                "prod.description AS description",
                "prod.image_url AS imageUrl",
                "pur.quantity AS quantity"
            )
            .innerJoin("purchases_products AS pur",
                "pur.product_id", "=", "prod.id")
            .where("pur.purchase_id", "=", id)

        const result = { ...purchaseResponse[0], products: [...productResponse] }
        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer, products }: Purchase = req.body
        if (!id || !buyer || !products) {
            throw new Error("É necessario fornecer as informações   id, buyer e products ")
        }

        if (typeof id !== "string" || typeof buyer !== "string") {
            throw new Error("id e buyer têm que ser tipo string")
        }

        const isProductsValid = Array.isArray(products)

        if (isProductsValid === false) {
            throw new Error("products precisa ser do tipo array")
        }

        const [isIdValid] = await db("purchases").where({ id })

        if (isIdValid) {
            throw new Error("id do produto já está cadastro")
        }

        const [isBuyerValid] = await db("users").where({ id: buyer })

        if (!isBuyerValid) {
            throw new Error("id de usuario inválido")
        }

        const productsids = products.map(produ => produ.id)
        const productsExists: ProductDB[] = await db("products").whereIn("id", productsids)

        if (products.length > productsExists.length) {
            throw new Error("Verifique novamente os produtos")
        }
        const totalPrice = productsExists.map((product) => {
            const productsAdded = products.find(prod => prod.id === product.id)
            if (productsAdded) {
                return product.price * productsAdded.quantity
            }
            return 0;
        }).reduce((total, price) => total + price, 0)

        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice
        }

        await db("purchases").insert(newPurchase)
        await db("purchases_products").insert(products.map((prod) => ({
            purchase_id: id,
            product_id: prod.id,
            quantity: prod.quantity
        })))
        res.status(201).send({ message: "Pedido realizado com sucesso!" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [idExist] = await db("purchases").where({ id })
        if (idExist) {
            throw new Error("id da compra inválido")
        }
        await db("purchases_products").del().where({ purchase_id: id })

        await db("purchases").del().where({ id })

        res.status(200).send({ message: "Pedido Cancelado com Sucesso " })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})