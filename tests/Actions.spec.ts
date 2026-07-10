import {test,expect} from '@playwright/test'

test('textbox', async({page})=>{
   await page.goto('https://the-internet.herokuapp.com/login');
   await page.locator('[id="username"]').fill('tomsmith');
   await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!', {delay:200});
   await page.close();
})

test('click', async({page})=>{
    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.locator('[id="click_area"]').click();
    await expect(page.locator('[id="click_type"]')).toHaveText('Click');
    await page.locator('[id="click_area"]').dblclick();
    await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click');
    await page.locator('[id="click_area"]').click({button:'right'});
    await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click');
    await page.close();
})


test('check', async({page})=>{
    await page.goto('http://test.rubywatir.com/radios.php');
    await page.locator('[class="radioclass"]').check();
    await expect(page.locator('[class="radioclass"]')).toBeChecked();
    await page.close();
})


test('checkbox', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await expect(page.locator('//*[@type="checkbox"][1]')).not.toBeChecked();
    await page.locator('//*[@type="checkbox"][1]').check();
    await expect( page.locator('//*[@type="checkbox"][1]').isChecked).toBeTruthy();
    await page.close();
})


test('dropdown', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('[id="dropdown"]', {
        value:"1"
    });
    await page.pause();
    await page.selectOption('[id="dropdown"]', {
        label:"Option 2"
    });
    await page.pause();
    await page.selectOption('[id="dropdown"]', {
        index:1
    });
    await page.pause();
    await page.close();
})


test('multiselect', async({page})=>{
    await page.goto('https://www.testmuai.com/selenium-playground/select-dropdown-demo/');
    await page.selectOption('[id="multi-select"]', [
        {value:"California"},
        {value:"Florida"},
        {value:"New Jersey"}
    ]
    );
    await page.pause();
    await page.close();
})


test('dynamic', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator('[role="combobox"]').click();
    await page.locator('//li[text()="Japan"]').click();
    await page.pause();
    await page.close();
})


test('alert', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog',async(alert)=>{
        const alertmessage = alert.message();
        expect(alertmessage).toEqual('I am a JS Alert');
        await alert.accept();
        await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
    })
    await page.locator('[onclick="jsAlert()"]').click();
    await page.pause();
    await page.close();
})


test('confirmation ok', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog',async(alert)=>{
        const alertmessage = alert.message();
        expect(alertmessage).toEqual('I am a JS Confirm');
        await alert.accept();
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');
    })
    await page.locator('[onclick="jsConfirm()"]').click();
    await page.pause();
    await page.close();
})


test('confirmation cancel', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog',async(alert)=>{
        const alertmessage = alert.message();
        expect(alertmessage).toEqual('I am a JS Confirm');
        await alert.dismiss();
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Cancel');
    })
    await page.locator('[onclick="jsConfirm()"]').click();
    await page.pause();
    await page.close();
})

test('frames', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    let bottomframe= page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]');
    await expect(bottomframe).toHaveText('BOTTOM');
    let topframe = page.frame('frame-top');
    let topframechilds=topframe?.childFrames();
    let middleFrame = topframechilds[1];
    await expect(middleFrame.locator('[id=content]')).toHaveText('MIDDLE');
})

test('dragAndDrop', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const boxA= page.locator('[id="column-a"]') ;
    const boxB= page.locator('[id="column-b"]');
    await page.waitForTimeout(2000);
    await boxA.dragTo(boxB);

    page.close();

})

test('download', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/download');

    const download = await Promise.all(
        [
            page.waitForEvent('download'), await page.locator('[href="download/random_data.txt"]').click()

        ]
    )

    const downloadFile=download[0];
    const downloadFilePath=await downloadFile.path();
    const downloadFileName=downloadFile.suggestedFilename();
    await downloadFile.saveAs("Islam Ashraf");
    console.log("The Download Path is ${downloadedFilePath}");

    page.close();

})

test('upload', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');

    const fileUpload = await Promise.all(
        [
            page.waitForEvent('filechooser'), await page.locator('[id="file-upload"]').click()

        ]
    )

    await fileUpload[0].setFiles('./Islam Ashraf');
    await page.locator('[id="file-submit"]').click();
    await page.waitForTimeout(2000);


    page.close();

})

