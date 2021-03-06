import React from 'react';
import { List, Typography } from "antd";
import './convo/style.css'
import conversationsListStyles from "./convo/ConversationsList.module.css";
import conversationsItemStyles from "./convo/ConversationsItem.module.css";

import { joinClassNames } from "../utils/class-name";

const { Text } = Typography;

export class ConversationsList extends React.Component {
    render() {
        const { conversations, selectedConversationSid, onConversationClick } = this.props;

        return (
            <List
                header={"Open Conversations"}
                className={conversationsListStyles['conversations-list']}
                bordered={true}
                loading={conversations.length === 0}
                dataSource={conversations}
                renderItem={item => {
                    const activeChannel = item.sid === selectedConversationSid;
                    const conversationItemClassName = joinClassNames([
                        conversationsItemStyles['conversation-item'],
                        activeChannel && conversationsItemStyles['conversation-item--active']
                    ]);

                    return (
                        <List.Item
                            key={item.sid}
                            onClick={() => onConversationClick(item)}
                            className={conversationItemClassName}
                        >
                            <Text
                                strong
                                className={conversationsItemStyles['conversation-item-text']}
                            >
                                {item.friendlyName || item.sid}
                            </Text>
                        </List.Item>
                    )
                }}
            />
        )
    }
}
