import {Message, MessageType, Mirai} from "mirai-ts";
import {newPersonCheckConfig} from "./config";

export const useNewPersonCheck = ({mirai}:{mirai: Mirai}) => {
    console.log('新人检测')
    const config = newPersonCheckConfig();
    mirai.on('MemberJoinEvent',(msg) => {
        console.log(msg, 'MemberJoinEvent')
        if(config.groupIds.includes(String(msg.member.group.id))) {
            const messageAt = Message.At(msg.member.id)
            const messagePlain = Message.Plain(config.question)
            mirai.api.sendGroupMessage([messageAt,messagePlain],msg.member.group.id).then(res => {
                let reply = 0
                console.log('发送成功', res)
                const listener: (data: MessageType.ChatMessage) => any = (replyMessage) => {
                    console.log(replyMessage, 'replyMessage')
                    if(replyMessage.type === 'GroupMessage' &&
                        replyMessage.sender?.group?.id === msg.member.group.id &&
                        replyMessage.sender.id === msg.member.id && !reply) {
                        console.log('回答问题了')
                        if(replyMessage.messageChain.find(item =>
                            item.type === 'Plain' && item.text === config.answer)) {
                            console.log(`${replyMessage.sender.memberName}答对了`)
                            reply = 1
                        } else {
                            console.log('回答错误')
                            mirai.api.sendGroupMessage([messageAt,{type: 'Plain',text: '回答错误'}], msg.member.group.id).then(res => {})
                        }
                    }

                }
                mirai.on('message',listener)
                const timer = setTimeout(() => {
                    if(!reply){
                        // 踢出群聊
                        mirai.api.kick(msg.member.group.id,msg.member.id,config.failed).then(res => {
                            console.log(`从${msg.member.group.name}踢出${msg.member.memberName}`,res)
                        })
                    }
                    mirai.off('message',listener)
                    clearTimeout(timer)
                    console.log('clear')
                }, config.delay * 1000)
            }).catch(err => {
                console.log(err, '发送失败')
            })
        }
    })
}