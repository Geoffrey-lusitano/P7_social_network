<template>
    <div class="main">
        <div class="card">
            <header class="card-header card-header-avatar">
                <img src="" class="card-header-picture">
                <div class="card-title">
                    {{ title }}
                </div>
                <div class="card-date">
                    {{ createdAt }}
                </div>
                <div class="card-updated">
                    {{ updatedAt }}
                </div>
            </header>
            <div class="card-body">
                <p class="card-content">
                    {{ content }}
                </p>
                <p>
                    {{ description }}
                </p>
                <img src= {{ attachment }} class="fullwidth">
            </div>
            <div class="card-footer">
                <div class="card-comments">

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// HEADER
.card {
    border: 1px solid #DBDBDB;
    background: #FFFF;
    border-radius: 3px;
}
.card-header {
    padding: 10px;
    position: relative;
}
.card-header-avatar {
    padding-left: 65px;
}
.card-avatar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
}
.card-title {
    font-weight: bold;
    color: #000;
    font-size: 18px;
    margin: 5px 0;
}
.card-date {
    color: rgba(0, 0, 0, 0.38);
    font-size: 12px;
}
// BODY 
.card-body {
    padding: 0 10px;
}
.card-body .fullwidth {
    width: calc(100% + 20px);
    display: block;
    margin: 0 -10px;
}
.card-body p:first-child {
    margin-top: 0;
}
.card-body p:last-child {
    margin-bottom: 0;
}
// FOOTER
.card-footer {
    border-top: 1px solid #DBDBDB;
    background: #FBFBFB;
    display: flex;
    padding: 0 10px;
    font-size: 12px;
    color: #DBDBDB;
}
.card-comments {
    margin-left: auto;
}

</style>