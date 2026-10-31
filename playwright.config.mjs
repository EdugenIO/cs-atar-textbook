import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/browser', fullyParallel:true, workers:3, retries:0,
 timeout:45000, globalTimeout:12*60*1000,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:8765',trace:'retain-on-failure',screenshot:'only-on-failure'},
 webServer:{command:'python -m http.server 8765 --bind 127.0.0.1 --directory dist',url:'http://127.0.0.1:8765',reuseExistingServer:!process.env.CI},
 projects:[{name:'chromium',use:{...devices['Desktop Chrome']}},{name:'firefox',use:{...devices['Desktop Firefox']}},{name:'webkit',use:{...devices['Desktop Safari']}}]
});
