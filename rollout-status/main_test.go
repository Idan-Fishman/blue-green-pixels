package main

import (
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

func TestRoot(t *testing.T) {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("pong! 🏓")
	})

	req := httptest.NewRequest("GET", "/", nil)

	resp, _ := app.Test(req)
	assert.Equal(t, resp.StatusCode, 200)
}

func TestStatus(t *testing.T) {
	app := fiber.New()

	app.Get("/status", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": 0})
	})

	req := httptest.NewRequest("GET", "/status", nil)

	resp, _ := app.Test(req)
	assert.Equal(t, resp.StatusCode, 200)
}

func TestRandom(t *testing.T) {
	app := fiber.New()

	app.Get("/random", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": 0})
	})

	req := httptest.NewRequest("GET", "/random", nil)

	resp, _ := app.Test(req)
	assert.Equal(t, resp.StatusCode, 200)
}

func TestRollout(t *testing.T) {
	app := fiber.New()

	app.Get("/rollout", func(c *fiber.Ctx) error {
		return c.Status(204).SendString("Rollout")
	})

	req := httptest.NewRequest("GET", "/rollout", nil)

	resp, _ := app.Test(req)
	assert.Equal(t, resp.StatusCode, 204)
}
