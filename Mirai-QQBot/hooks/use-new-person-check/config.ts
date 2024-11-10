export const newPersonCheckConfig =() => {
    const groupIds = ['343850788','883636819']
    const delay = 300
    return {
        /**
         * 需要检测的群组
         */
        groupIds,
        question: `入群检测：\n请在${delay}秒内完成作答，否则将会被踢出群聊。\n问题是：\n河南工业大学的英文简称是什么？(英文大写)\n`,
        answer: 'HAUT',
        success: '',
        failed: `很遗憾回答错误，我们认定你为机器人，${delay}秒后将会把你踢出此群, 如果有问题的话可以私聊群主解释。`,
        delay
    }
}