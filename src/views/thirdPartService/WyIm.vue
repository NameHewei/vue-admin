<template>
    <div>
        <h1>云信 Web SDK Online Test</h1>
        <div>
        <p>
            <span>APPKEY:</span>
        <input type="text" id="appkey" value="45c6af3c98409b18a84451215d0bdd6e">
        </p>
        <p>
            <span>ACCOUNT:</span>
            <input type="text" id="account" value="greatcs4">
        </p>
        <p>
            <span>TOKEN:</span>
            <input type="text" id="token" value="e10adc3949ba59abbe56e057f20f883e">
        </p>
        <p>
            <button id="connect-sdk">连接SDK</button>
        </p>
        </div>
        <div>
            <button id='sendText' click="">发送消息</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WyIm',

    mounted () {
        document.getElementById('sendText').addEventListener('click', function () {
            sendMsg()
        }, false)

        // var data = {}

        // function connectSDK () {
        //     var appkey = document.getElementById('appkey').value
        //     var account = document.getElementById('account').value
        //     var token = document.getElementById('token').value
        //     window.nim = NIM.getInstance({
        //         appKey: appkey,
        //         account: account,
        //         token: token,
        //         onconnect: function () {
        //             this.$message.success('SDK 连接成功')
        //             // 连接成功后才能发消息
        //             window.nim.sendText({
        //                 scene: 'p2p',
        //                 to: 'account',
        //                 text: 'hello',
        //                 done: function sendMsgDone (msg) {
        //                 }
        //             })
        //         },
        //         ondisconnect: function (obj) {
        //             // console.log('SDK 连接断开', obj)
        //         },
        //         onerror: function (error) {
        //             console.error('SDK 连接失败', error)
        //         },

        //         onroamingmsgs: onRoamingMsgs,
        //         onofflinemsgs: onOfflineMsgs,
        //         onmsg: onMsg,

        //         // 好友列表
        //         onfriends: onFriends,
        //         onsyncfriendaction: onSyncFriendAction,

        //         // 最近会话
        //         onsessions: onSessions,
        //         onupdatesession: onUpdateSession
        //     })
        // }

        // function onRoamingMsgs (obj) {
        //     // console.log('收到漫游消息', obj)
        //     pushMsg(obj.msgs)
        // }
        // function onOfflineMsgs (obj) {
        //     // console.log('收到离线消息', obj)
        //     pushMsg(obj.msgs)
        // }
        // function onMsg (msg) {
        //     // console.log('收到消息', msg.scene, msg.type, msg)
        //     pushMsg(msg)
        //     switch (msg.type) {
        //     case 'custom':
        //         onCustomMsg(msg)
        //         break
        //     case 'notification':
        //         // 处理群通知消息
        //         onTeamNotificationMsg(msg)
        //         break
        //     // 其它case
        //     default:
        //         break
        //     }
        // }

        // 发送消息
        function sendMsg () {
            // var msg = ''
            // window.nim.sendText({
            //     scene: 'p2p',
            //     to: 'account',
            //     text: 'hello',
            //     done: sendMsgDone
            // })
            // console.log('正在发送p2p text消息, id=' + msg.idClient)
            // pushMsg(msg)
            // function sendMsgDone (error, msg) {
            //     console.error(error)
            //     // console.log(msg)
            //     // console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient)
            //     pushMsg(msg)
            // }
        }

        // function pushMsg (msgs) {
        // console.log('pushMsg', msgs)
        // if (!Array.isArray(msgs)) { msgs = [msgs] }
        // var sessionId = msg[0].scene + '-' + msgs[0].account
        // data.msgs = data.msgs || {}
        // data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs)
        // }

        // function onCustomMsg (msg) {
        // console.log('onCustomMsg', msg)
        // 处理自定义消息
        // }

        // function onTeamNotificationMsg (msg) {
        // console.log('onTeamNotificationMsg', msg)
        // 处理群通知消息
        // var type = msg.attach.type,
        //     from = msg.from,
        //     teamId = msg.to,
        //     timetag = msg.time,
        //     team = msg.attach.team,
        //     account = msg.attach.account,
        //     accounts = msg.attach.accounts,
        //     members = msg.attach.members
        // switch (type) {
        // case 'updateTeam':
        //     team.updateTime = timetag
        //     onTeams(team)
        //     break
        // case 'addTeamMembers':
        //     onAddTeamMembers(team, accounts, members)
        //     break
        // case 'removeTeamMembers':
        //     onRemoveTeamMembers(team, teamId, accounts)
        //     break
        // case 'acceptTeamInvite':
        //     onAddTeamMembers(team, [from], members)
        //     break
        // case 'passTeamApply':
        //     onAddTeamMembers(team, [account], members)
        //     break
        // case 'addTeamManagers':
        //     updateTeamManagers(teamId, members)
        //     break
        // case 'removeTeamManagers':
        //     updateTeamManagers(teamId, members)
        //     break
        // case 'leaveTeam':
        //     onRemoveTeamMembers(team, teamId, [from])
        //     break
        // case 'dismissTeam':
        //     dismissTeam(teamId)
        //     break
        // case 'transferTeam':
        //     transferTeam(team, members)
        //     break
        // }
        // }

        // 接收好友列表
        // function onFriends (friends) {
        // console.log('收到好友列表', friends)
        //     data.friends = window.nim.mergeFriends(data.friends, friends)
        //     data.friends = window.nim.cutFriends(data.friends, friends.invalid)
        //     refreshFriendsUI()
        // }
        // function onSyncFriendAction (obj) {
        //     // console.log(obj)
        //     switch (obj.type) {
        //     case 'addFriend':
        //         // console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps)
        //         onAddFriend(obj.friend)
        //         break
        //     case 'applyFriend':
        //         // console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps)
        //         break
        //     case 'passFriendApply':
        //         // console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps)
        //         onAddFriend(obj.friend)
        //         break
        //     case 'rejectFriendApply':
        //         // console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps)
        //         break
        //     case 'deleteFriend':
        //         // console.log('你在其它端删了一个好友' + obj.account)
        //         onDeleteFriend(obj.account)
        //         break
        //     case 'updateFriend':
        //         // console.log('你在其它端更新了一个好友', obj.friend)
        //         onUpdateFriend(obj.friend)
        //         break
        //     }
        // }
        // function onAddFriend (friend) {
        //     data.friends = window.nim.mergeFriends(data.friends, friend)
        //     refreshFriendsUI()
        // }
        // function onDeleteFriend (account) {
        //     data.friends = window.nim.cutFriendsByAccounts(data.friends, account)
        //     refreshFriendsUI()
        // }
        // function onUpdateFriend (friend) {
        //     data.friends = window.nim.mergeFriends(data.friends, friend)
        //     refreshFriendsUI()
        // }
        // function refreshFriendsUI () {
        //     // 刷新界面
        // }

        // function onSessions (sessions) {
        //     // console.log('收到会话列表', sessions)
        //     data.sessions = window.nim.mergeSessions(data.sessions, sessions)
        //     updateSessionsUI()
        // }
        // function onUpdateSession (session) {
        //     // console.log('会话更新了', session)
        //     data.sessions = window.nim.mergeSessions(data.sessions, session)
        //     updateSessionsUI()
        // }
        // function updateSessionsUI () {
        //     // 刷新界面
        // }

        document.getElementById('connect-sdk').addEventListener('click', function () {
            // connectSDK()
        })
    },

    methods: {

    }
}
</script>

<style scoped>

</style>
