import fetch from "node-fetch";
import playwright from "playwright";

async function scrapeImage(username) {
  for (const browserType of ["chromium", "firefox", "webkit"]) {
    console.log(browserType); // To know the chosen one 😁
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.instagram.com/accounts/login/");
    // Login form
    // set a delay to wait for page to completely load all contents
    await page.waitForTimeout(9000);
    // You can also take screenshots of pages
    // await page.screenshot({
    //   path: `ig-sign-in.png`,
    // });
    await page.type("[name=username]", "nppi3enz");
    await page.type('[type="password"]', "@Chantada038");
    await page.click("[type=submit]");
    await page.waitForTimeout(5000);

    await page.goto(`https://www.instagram.com/${username}/?__a=1`);
    await page.screenshot({ path: `user.png` });
    await page.waitForTimeout(5000);
    await page.content().then((resp) => console.log(resp));
    // console.log(result);
    // await page.waitForSelector("img ", {
    //   visible: true,
    // });
    // // await page.screenshot({ path: `profile.png` });
    // await page.waitForTimeout(5000);
    // // Execute code in the DOM
    // const data = await page.evaluate(() => {
    //   const a = document.querySelectorAll("a");
    //   const links = Array.from(a).map((v) => v.href);
    //   console.log(links);

    //   const images = document.querySelectorAll("img");
    //   console.log(images);

    //   const urls = Array.from(images).map((v) => v.src);
    //   console.log(urls);
    //   return urls;
    // });
    await browser.close();
    return true;
  }
}
scrapeImage("lastidol_th");
