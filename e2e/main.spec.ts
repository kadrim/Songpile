import { BrowserContext, ElectronApplication, Page, _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
const PATH = require('path');

test.describe('Check Home Page', async () => {
  let app: ElectronApplication;
  let firstWindow: Page;
  let context: BrowserContext;

  test.beforeAll( async () => {
    app = await electron.launch({ args: [PATH.join(__dirname, '../app/main.js'), PATH.join(__dirname, '../app/package.json')] });
    context = app.context();
    await context.tracing.start({ screenshots: true, snapshots: true });
    firstWindow = await app.firstWindow();
    await firstWindow.waitForLoadState('domcontentloaded');
  });

  test('Launch electron app', async () => {

    const windowState: { isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean } = await app.evaluate(async (process) => {
      const mainWindow = process.BrowserWindow.getAllWindows()[0];

      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else {
          mainWindow.once('ready-to-show', () => setTimeout(() => resolve(getState()), 0));
        }
      });
    });

    expect(windowState.isVisible).toBeTruthy();
    expect(windowState.isDevToolsOpened).toBeFalsy();
    expect(windowState.isCrashed).toBeFalsy();
  });

  // test('Check Home Page design', async ({ browserName}) => {
  //   // Uncomment if you change the design of Home Page in order to create a new screenshot
  //   const screenshot = await firstWindow.screenshot({ path: '/tmp/home.png' });
  //   expect(screenshot).toMatchSnapshot(`home-${browserName}.png`);
  // });

  test('Check title', async () => {
    const elem = await firstWindow.$('app-home h1');
    const text = await elem.innerText();
    expect(text).toBe('App works !');
  });

  test('Navigate to example-page', async () => {
    const menuButton = await firstWindow.$('app-root #menuButton');
    await menuButton.click();
    const exampleButton = await firstWindow.$('app-navigation #exampleButton');
    await exampleButton.click();
    const elem = await firstWindow.$('app-example h1');
    const text = await elem.innerText();
    expect(text).toBe('Example page !');
  });

  test('Click button to download and convert sample file', async () => {
    const dowloandAndConvertButton = await firstWindow.$('app-example #downloadAndConvert');
    await dowloandAndConvertButton.click();
    await firstWindow.waitForTimeout(10 * 1000);
    const outputFile = path.resolve('./out.mp3');
    const buffer = fs.readFileSync(outputFile);
    fs.unlinkSync(outputFile);
    expect(buffer.byteLength > 100 * 1024);
  });

  test.afterAll( async () => {
    await context.tracing.stop({ path: 'e2e/tracing/trace.zip' });
    await app.close();
  });
});
