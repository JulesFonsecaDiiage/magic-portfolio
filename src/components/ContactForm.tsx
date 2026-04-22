"use client";

import {getMessages} from "@/i18n/messages";
import {Locale} from "@/i18n/config";
import {mailchimp, person} from "@/resources";
import {
    Background,
    Button,
    Column,
    Heading,
    Input,
    opacity,
    Row,
    SpacingToken,
    Text,
    useToast
} from "@once-ui-system/core";
import {SubmitEvent, useMemo, useState} from "react";

type ContactFormProps = React.ComponentProps<typeof Column> & {
    locale: Locale;
};

export const ContactForm: React.FC<ContactFormProps> = ({locale, ...columnProps}) => {
    const messages = getMessages(locale);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const {addToast} = useToast();

    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

    const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailRegex.test(email)) {
            setFeedback(messages.contact.emailError);
            return;
        } else if (message.trim().length < 10) {
            setFeedback(messages.contact.messageError);
            return;
        } else {
            setFeedback(null);
        }

        const res = await fetch('/api/contact', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, message}),
        });
        if (res.ok) {
            setName("");
            setEmail("");
            setMessage("");
            addToast({
                variant: "success",
                message: messages.contact.success,
            });
        } else {
            addToast({
                variant: "danger",
                message: messages.contact.error,
            });
        }
    };

    return (
        <Column
            overflow="hidden"
            as="section"
            fillWidth
            gap="16"
            padding="xl"
            radius="l"
            border="neutral-alpha-weak"
            background="surface"
            {...columnProps}
        >
            <Background
                top="0"
                left="0"
                position="absolute"
                mask={{
                    x: mailchimp.effects.mask.x,
                    y: mailchimp.effects.mask.y,
                    radius: mailchimp.effects.mask.radius,
                    cursor: mailchimp.effects.mask.cursor,
                }}
                gradient={{
                    display: mailchimp.effects.gradient.display,
                    opacity: mailchimp.effects.gradient.opacity as opacity,
                    x: mailchimp.effects.gradient.x,
                    y: mailchimp.effects.gradient.y,
                    width: mailchimp.effects.gradient.width,
                    height: mailchimp.effects.gradient.height,
                    tilt: mailchimp.effects.gradient.tilt,
                    colorStart: mailchimp.effects.gradient.colorStart,
                    colorEnd: mailchimp.effects.gradient.colorEnd,
                }}
                dots={{
                    display: mailchimp.effects.dots.display,
                    opacity: mailchimp.effects.dots.opacity as opacity,
                    size: mailchimp.effects.dots.size as SpacingToken,
                    color: mailchimp.effects.dots.color,
                }}
                grid={{
                    display: mailchimp.effects.grid.display,
                    opacity: mailchimp.effects.grid.opacity as opacity,
                    color: mailchimp.effects.grid.color,
                    width: mailchimp.effects.grid.width,
                    height: mailchimp.effects.grid.height,
                }}
                lines={{
                    display: mailchimp.effects.lines.display,
                    opacity: mailchimp.effects.lines.opacity as opacity,
                    size: mailchimp.effects.lines.size as SpacingToken,
                    thickness: mailchimp.effects.lines.thickness,
                    angle: mailchimp.effects.lines.angle,
                    color: mailchimp.effects.lines.color,
                }}
            />
            <Heading as="h2" variant="display-strong-xs">
                {messages.contact.formTitle}
            </Heading>
            <form onSubmit={onSubmit}>
                <Column gap="12">
                    <Input
                        id="contact-name"
                        value={name}
                        label={messages.contact.nameLabel}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        id="contact-email"
                        type="email"
                        value={email}
                        label={messages.contact.emailLabel}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Column gap="8">
                        <Text variant="label-default-s" onBackground="neutral-weak">
                            {messages.contact.messageLabel}
                        </Text>
                        <textarea
                            id="contact-message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            rows={6}
                            style={{
                                width: "100%",
                                borderRadius: "var(--radius-m)",
                                border: "1px solid var(--neutral-alpha-medium)",
                                background: "var(--page-background)",
                                color: "var(--neutral-on-background-strong)",
                                padding: "0.75rem",
                                fontFamily: "inherit",
                                fontSize: "0.95rem",
                                resize: "vertical",
                            }}
                        />
                    </Column>
                    <Row horizontal="between" vertical="center" gap="12" s={{direction: "column", horizontal: "start"}}>
                        <Button type="submit" variant="primary" size="m">
                            {messages.contact.submit}
                        </Button>
                        {feedback && (
                            <Text variant="body-default-s" onBackground="neutral-weak">
                                {feedback}
                            </Text>
                        )}
                    </Row>
                </Column>
            </form>
        </Column>
    );
};

