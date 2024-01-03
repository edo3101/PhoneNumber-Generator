package router

import (
	"tugas/controllers"
	"tugas/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func StartApp() *gin.Engine {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173", "http://localhost:5000", "http://127.0.0.1:5000", "http://127.0.0.1:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	userRouter := r.Group("/user")
	{
		userRouter.POST("/register", controllers.UserRegister)
		userRouter.POST("/login", controllers.UserLogin)
	}

	phoneNumberRouter := r.Group("/phone")
	{
		phoneNumberRouter.Use(middlewares.Authentication())
		phoneNumberRouter.POST("/create", controllers.CreatePhoneNumber, middlewares.Authorization())
		phoneNumberRouter.POST("/auto", controllers.AutoGenerateNumber, middlewares.Authorization())
		phoneNumberRouter.GET("/auto", controllers.GetPhoneNumbers, middlewares.Authorization())
		phoneNumberRouter.PUT("/:PhoneID", controllers.UpdateNumber, middlewares.Authorization())
		phoneNumberRouter.GET("/:PhoneID", controllers.GetPhoneNumberById, middlewares.Authorization())
		phoneNumberRouter.DELETE("/:PhoneID", controllers.DeleteNumber, middlewares.Authorization())
	}

	return r
}
