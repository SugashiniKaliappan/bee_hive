import express from "express";
import { connectToDbFunc } from "./config/dbConnect.js"; // ✅ Named import
import { router } from "./routes/ward.route.js"; // ✅ Ensure correct import

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6001;

// Delay database connection
setTimeout(() => {
    connectToDbFunc();
}, 2000);

// Setup route
app.use("/api/v1/wardadmissions", router);

// Export app for testing
export { app };

// Start server only when this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on PORT ${PORT}`);
    });
}
