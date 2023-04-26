<script lang="ts">
    import {user,displayUser} from '../../stores';
    export let data;
    $:NoAuthUser = data?.displayUser;
    $:AuthUser = data?.userMinusPassword;
    $:photos = data?.userFiles;

    $:{
        displayUser.set(NoAuthUser);
    }
    $:{
        user.set(AuthUser)
    }

    //console.log(photos);

</script>



<div class="user-wrapper" style="--theme-primaryColor: {NoAuthUser.palette.primary}; --theme-secondaryColor: {NoAuthUser.palette.secondary}; --theme-textColor: {NoAuthUser.palette.text}" >

    {#if NoAuthUser.options.hero}
    <div>
        <img class="hero-image" src={`${NoAuthUser?.URL}/${NoAuthUser?.options.heroImage}`} alt="user chosen hero image"/>
    </div>

    {/if}
    <h1>Check out the wonderful work of {NoAuthUser?.firstName}</h1>
        {#if NoAuthUser?.options.message}
        <h2 class="message">{NoAuthUser?.options.message}</h2>
        {/if}
        <div class="photo-wrapper">
            {#each photos as photo}
            <div class="img">
                <img src={`${NoAuthUser.URL}/${photo}`} alt={photo.toString()} />
            </div>
            {/each}

        </div>

</div>

<style>
    h1,h2 {
        color: var(--theme-textColor);
        margin-block: .5em;
    }
    .hero-container{
        width:100vw;
    }
    .hero-image{

        height:auto;
    }
    a{
    color: #e75454
    }
    .user-wrapper{
        height: 100%;
        width: 100%;
        background-color: var(--theme-primaryColor);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .photo-wrapper{
        display: grid;
        grid-template-columns: auto auto auto;
        background-color: var(--theme-primaryColor);
    }
    .img{
        height: 170px;
        width:300px;
        margin: .5em;
    }
    img{
        max-width: 100%;
        height: auto;
    }

</style>