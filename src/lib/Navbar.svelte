<script>
    import {user,displayUser} from '../stores';
    import {page} from '$app/stores';

    $:thisUser = $user;
    $:currentDisplayUser = $displayUser;

    let onUserPage = false;
    
    const nonUserPages = ['','/','/signup','/login','/resetPassword','/forgotPassword'];
    $:{
        const result = !nonUserPages.includes($page.url.pathname);
        onUserPage = result;
        //console.log("PATH ",$page.url.pathname)
        //console.log("is on user page",onUserPage);
        //console.log(currentDisplayUser);
    }

</script>

<nav class="nav-base" class:standard={!onUserPage}  class:top={onUserPage && currentDisplayUser?.options.layout ==='top'} class:side={onUserPage && currentDisplayUser?.options.layout ==='side'} style="--theme-primaryColor: {onUserPage? currentDisplayUser?.palette.primary: "#242424"}; --theme-textColor: {onUserPage? currentDisplayUser?.palette.text : '#FFFFFF'}; --theme-secondaryColor: {onUserPage?currentDisplayUser?.palette.secondary : '#FFFFFF'}">
    <a href="/">Home</a>
    {#if !thisUser }
    <a href="/signup">Sign Up</a>
    <a href="/login">Login</a>
    {/if}

    {#if thisUser }
    <a href={`/${thisUser.URL}`}>Your Page</a>
    <a data-sveltekit-preload-data="off" href={`/${thisUser.URL}/dashboard`}>Dashboard</a>
    <a data-sveltekit-preload-data="off" href='/logout'>Logout</a>
    {/if}
</nav>

<style>
    .nav-base{
        height: 1.5em;
        top:0;
        position: fixed;
        display: flex;
        transition: all 0.3s ease-out;
        transition: all 0.3s ease-in;
    }
    .standard{
        width:100%;
        padding-top: 1em;
        background: linear-gradient(to right, #FFFFFF, #242424);
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(122, 117, 117,0.3);
        padding-bottom: 1em;
    }
    .top{
        width:100%;
        padding-top: 1em;
        background: linear-gradient(to right, var(--theme-secondaryColor), var(--theme-primaryColor));
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(122, 117, 117,0.3);
        padding-bottom: 1em;

    }
    .side{
        height:100vh;
        padding-right: 1em;
        flex-direction: column;
        justify-content: center;
        background: linear-gradient(to bottom, var(--theme-secondaryColor), var(--theme-primaryColor));
        border-right: 1px solid rgba(122, 117, 117,0.3);


    }
    .side a{
        color:#FFF;
        text-decoration: none;
        margin-bottom: 1em;
        font-size: larger;
    }

    a{
        color:#000000;
        text-decoration: none;
        margin-left: 1em;
        font-size: larger;
        padding:2px;
    }
    a:hover{
        opacity: .8;
        text-decoration: underline;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        padding:2px;

    }

</style>