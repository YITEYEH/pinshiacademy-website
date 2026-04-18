import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#e8f5ee] to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              找不到頁面
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              抱歉，您訪問的頁面不存在或已被移除
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link to="/">
                <Home className="mr-2 w-5 h-5" />
                返回首頁
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              返回上一頁
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
