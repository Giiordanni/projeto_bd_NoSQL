import mongoose from "mongoose";


const connectDataBase = () => {
    console.log("Aguardando conexão")
    mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
});

}

export default connectDataBase