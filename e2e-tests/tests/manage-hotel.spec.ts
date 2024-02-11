import path from "path";
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("Should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
        .locator('[name="description"]')
        .fill(
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        );
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        // path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Test Hotel")).toBeVisible();
    await expect(
        page.getByText("Sed ut perspiciatis unde omnis iste")
    ).toBeVisible();
    await expect(page.getByText("Test City , Test Country")).toBeVisible();
    await expect(page.getByText("Budget")).toBeVisible();
    await expect(page.getByText("$100 per night")).toBeVisible();
    await expect(page.getByText("$2 adults, 4 children")).toBeVisible();
    await expect(page.getByText("3 Star Rating")).toBeVisible();

    await expect(
        page.getByRole("link", { name: "View Details" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
