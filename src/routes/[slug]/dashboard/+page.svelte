<script lang="ts">
    import {user,displayUser} from '../../../stores';
    export let form;
    export let data;


    let fileInput:HTMLInputElement;
    let files:any;
    let picture:any;
    let pictureData:any;
    let selectedPicture:any;
    let confirmDelete:boolean = false;

    $:User = data?.userMinusPassword;
    $:DisplayUser = data?.userMinusPassword;

    $:{
        const newUser = User;
        const newDisplayUser = DisplayUser;
        user.set(newUser);
        displayUser.set(newDisplayUser);
    }

    $:saveResult = form?.message;

    $:{
        if(saveResult)setTimeout(()=>{
            saveResult = '';
        },4000)
    }




</script>
<div class="dashboard-wrapper" style="--theme-primaryColor: {DisplayUser?.palette.primary}; --theme-secondaryColor: {DisplayUser?.palette.secondary}; --theme-textColor: {DisplayUser?.palette.text}">
    <div>
        <h1>{`Welcome to your dashboard ${data?.userMinusPassword?.firstName}!`}</h1>
        
        <h2>
            Admin Options
            <sup title="These options will be reflected only for your URL."><small class="info-icon">i</small></sup>
        </h2>
        
        <form method="post" action="?/saveOptions">
            <label for="layout">Navigation Location</label>
            <select name="layout" value={User?.options.layout}>
                <option value="top">Top</option>
                <option value="side">Side</option>
            </select>
            <hr />
        
            <div class="layout-color-option">
                <label for="primary">Primary Color</label>
                <input type="color" id="primary" name="primary" value={User?.palette.primary?? "242424"} />
            </div>
            <div class="layout-color-option">
                <label for="secondary">Secondary Color</label>
                <input type="color" id="secondary" name="secondary" value={User?.palette.secondary?? "FFFFFF"}/>
            </div>
            <div class="layout-color-option">
                <label for="text">Text Color</label>
                <input type="color" id="text" name="text" value={User?.palette.text?? "FFFFFF"} />
            </div>
            <hr />
            <div class="layout-option">
                <label for="carousel">Carousel <sup title="Images spin around a carousel!"><small class="info-icon">i</small></sup></label>
                <input type="checkbox" name="carousel" value="carousel" checked={User?.options.carousel}  />
        
            </div>
            <div class="layout-option">
                <label for="hero">Hero<sup title="Large image on top of page with text on top."><small class="info-icon">i</small></sup></label>
                <input type="checkbox" name="hero" value="hero" checked={User?.options.hero} />
            </div>

            <div class="layout-option">
                <div>
                    <label for="message">Message</label>
                </div>
                <textarea  cols={20} name="message" value={User?.options.message}  />
            </div>
        
            <div class="layout-option">
                <button type="submit">Save Options</button>
            </div>
        
            <div class="layout-option">
                {#if saveResult}
                <small class:success={!form?.error} class:error={form?.error}>{saveResult}</small>
                {/if}
            </div>
        
        </form>
        <div>

        </div>
        
 
        
        </div>

</div>

<style>
    .dashboard-wrapper{
        height: 100vh;
        width: 100vw;
        background-color: var(--theme-primaryColor);
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    h1,h2{
        margin-top: .25em;
        margin-bottom: .25em;
        color: var(--theme-textColor);
    }
    select{
        width: 100%;
    }
    sup{
        display: inline-block;
        width: 1em;
        height: 1em;
        text-align: center;
    }
    button{
        color: #000000;
        background-color: var(--theme-secondaryColor);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        border: 0;

    }
    button:hover{
        cursor: pointer;
        opacity: .8;
        box-shadow: inset 2px #242424;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        outline: 2px solid ;
    }
    .dashboard-wrapper{
        height: 100vh;
    }
    .layout-option{
        margin-bottom:.5em;
    }
    .layout-color-option{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: .2em;
    }
    .info-icon{
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid var(--theme-textColor);
        border-radius: 50%;
        padding: 2px;
    }
    .success{
        color:#00ff44;
    }
    .error{
        color: #ff0000;
    }
    .image{

        height: 128px;
        width: auto;
        margin-bottom: .5em;
    }
    #no-image {

    }
    .hidden {
        display: none;
    }
    .layout-option-upload{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .preview{
        color: var(--theme-textColor);
        text-decoration: underline;
        margin-top: .25em;
        margin-bottom:  .25em;
    }
    label{
        color: var(--theme-textColor);
    }
    .preview-select{
        margin-bottom: 1em;
    }
    .delete-warning{
        color: var(--theme-textColor);
        display: inline-block;
    }

</style>


