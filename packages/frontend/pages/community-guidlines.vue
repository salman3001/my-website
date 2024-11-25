<template>
    <v-container max-width="900">

        <h1>Community Guidelines</h1>

        <p>
            Welcome to {{ $config.public.appName }}! At {{ $config.public.appName }}, we strive to create a welcoming,
            inclusive, and respectful community for everyone. Whether you're
            commenting on blog posts, participating in discussions, or sharing
            your thoughts, we expect all users to adhere to the following
            guidelines. By interacting with our website, you agree to follow these
            rules.
        </p>
        <br>

        <v-list>
            <v-list-item>
                <h2><strong>1. Be Respectful</strong></h2>
                <p>
                    Respect is the cornerstone of our community. Treat others as you
                    would like to be treated.
                </p>
                <ul>
                    <li>Avoid personal attacks: Critique ideas, not people.</li>
                    <li>
                        Be polite: Disagreements should always be expressed
                        respectfully.
                    </li>
                    <li>
                        No hate speech: Hate speech or discrimination of any kind is
                        strictly prohibited.
                    </li>
                </ul>

            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>2. No Harassment</strong></h2>
                    <p>
                        Harassment of any kind will not be tolerated.
                    </p>
                    <ul>
                        <li>
                            Targeted harassment: Do not repeatedly message or comment to
                            harass others.
                        </li>
                        <li>
                            Bullying: Any form of bullying, whether online or offline, is
                            strictly forbidden.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>3. Stay On-Topic</strong></h2>
                    <p>
                        Keep discussions relevant to the topic at hand.
                    </p>
                    <ul>
                        <li>
                            Relevance: Stay on topic. Keep your comments or discussions
                            relevant to the blog post or discussion thread.
                        </li>
                        <li>
                            Spam: Avoid posting irrelevant, repetitive, or promotional
                            content.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>4. Respect Privacy</strong></h2>
                    <p>
                        Respect the privacy of others, both online and offline.
                    </p>
                    <ul>
                        <li>
                            No sharing personal information: Do not share personal details
                            like home addresses or phone numbers.
                        </li>
                        <li>
                            Respect others' intellectual property: Don't use or share
                            content without permission.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>5. No Inappropriate Content</strong></h2>
                    <p>
                        We want our website to be a safe place for everyone.
                    </p>
                    <ul>
                        <li>
                            Explicit content: This includes adult content, graphic
                            violence, or offensive material.
                        </li>
                        <li>
                            Malicious content: Do not share viruses, malware, or harmful
                            links.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>6. Use Constructive Feedback</strong></h2>
                    <p>
                        If offering feedback or criticism, ensure it is constructive.
                    </p>
                    <ul>
                        <li>
                            Be helpful: If you disagree, offer solutions or alternatives.
                        </li>
                        <li>
                            Encourage positive discussion: Engage with others in ways that
                            promote growth and learning.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>7. Follow the Law</strong></h2>
                    <p>
                        Do not post content that violates any laws or regulations.
                    </p>
                    <ul>
                        <li>
                            Copyright infringement: Don’t post content you don’t own or
                            have permission to use.
                        </li>
                        <li>
                            Illegal activities: Do not promote or encourage unlawful
                            behavior.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>8. Be Honest and Transparent</strong></h2>
                    <p>
                        Honesty is essential for building trust in our community.
                    </p>
                    <ul>
                        <li>
                            No misinformation: Avoid spreading false or misleading
                            information.
                        </li>
                        <li>
                            Disclosure of affiliations: If posting for business purposes,
                            disclose it clearly.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>9. Moderation and Enforcement</strong></h2>
                    <p>
                        We take our community guidelines seriously and may remove or
                        edit content.
                    </p>
                    <ul>
                        <li>
                            Flagging inappropriate content: If you see content that
                            violates these guidelines, report it.
                        </li>
                        <li>
                            Appeal process: Reach out if you believe your content was
                            removed in error.
                        </li>
                    </ul>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <br>
                    <h2><strong>10. Privacy and Data Protection</strong></h2>
                    <p>
                        Your privacy is important to us. Please refer to our Privacy
                        Policy for more information.
                    </p>
                </v-list-item-content>
            </v-list-item>
            <br>
        </v-list>

        <v-btn color="primary" :to="routes.web.contact()" class="mt-4">Contact Us</v-btn>
        <br>
        <br>
        <br>
    </v-container>
</template>
