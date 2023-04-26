<script lang="ts">
    import {checkPassword} from '../../passwordCheck'
    export let data;

    console.log(data);

    $:email = data?.email ;
    let pass:string;
    let confirm:string;
    let showPassword:boolean = false;
    let showConfirm:boolean = false;

    $:passError = (pass?.length && confirm?.length)? pass !== confirm? true: false: false;
    $:weakError = checkPassword(pass??'')? checkPassword(pass??''): false;



    
    </script>
    
    <div class="login-wrapper">
    <h2>*ADD WEBSITE LOGO HERE*</h2>
    
        <form   method="post" action="?/resetPassword">

            <div class="form-item">
                <label for="password">Password<sup><small class="required">*</small></sup></label>
                <div class="visibility-wrapper">
                {#if !showPassword}
                    <button class="btn-visiblity" type="button" on:click={() => showPassword = true}>
                        <span class="material-symbols-outlined">
                        visibility
                        </span>
                    </button>
                    <input bind:value={pass} class:fieldError={passError || weakError} type='password' id="password" name="password" required />
                {:else}
                    <button class="btn-visiblity" type="button" on:click={() => showPassword = false}>
                        <span class="material-symbols-outlined">
                            visibility_off
                        </span>
                    </button>
                    <input bind:value={pass} class:fieldError={passError || weakError} type='text' id="password" name="password" required />
                {/if}
        
                </div>  
            </div>
        
            <div class="form-item">
                <label for="confirmPassword">Confirm Password<sup><small class="required">*</small></sup></label>
                <div class="visibility-wrapper">
                {#if !showConfirm}
                    <button class="btn-visiblity" type="button" on:click={() => showConfirm = true}>
                        <span class="material-symbols-outlined">
                        visibility
                        </span>
                    </button>
                    <input bind:value={confirm} class:fieldError={passError || weakError} type='password' id="confirmPassword" name="confirmPassword" required />
                {:else}
                    <button class="btn-visiblity" type="button" on:click={() => showConfirm = false}>
                        <span class="material-symbols-outlined">
                            visibility_off
                        </span>
                    </button>
                    <input bind:value={confirm} class:fieldError={passError || weakError} type='text'  id="confirmPassword" name="confirmPassword" required />
                {/if}
                </div>
            </div>

            <input type="hidden" bind:value={email} name="email" id="email" />
        
            <div class="form-item">
                <button disabled={weakError || passError} type="submit" class="btn btn-primary">Reset</button>
            </div>
            <div class="form-item">
                {#if passError}
                <small class:error={passError}>Passwords do not match!</small>
                {/if}
                {#if weakError}
                <small class:error={weakError}>Password is too weak!</small>
                {/if}
            </div>
        
        </form>
    </div>
    
    <style>
        div{
            color: #FFF;
            margin-bottom: .5em;
        }
        label{
            padding-right: .5em;
        }
        .error{
            padding-left: .5em;
            color: #ff0000;
        }
        .required{
            padding-left: .5em;
            color: #ff0000;
        }
        button{
            width: 100%;
            background-color: #FFF;
            transition: all 0.3s ease-in;
        }
        button:hover{
            cursor: pointer;
            text-decoration: underline;
            color: #FFF;
            background-color: #4d4c4c;
            transition: all 0.3s ease-in;
        }
        .form-item{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .login-wrapper{
            height: 100vh;
        }
        .btn-visiblity{
        border-radius: 9999999px;
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        }
        .btn-visiblity:hover{
            background-color: rgba(0, 0, 0, 0);
        }
        span{
            color: #ffffff;
            border-radius: 115px;
        }
        span:hover{
            color: rgba(255, 255, 255, 0.7);
        }
        .visibility-wrapper{
            display: flex;
            flex-direction: row;
        }
        .fieldError{
        outline: 2px solid #ff0000;
        }
    </style>