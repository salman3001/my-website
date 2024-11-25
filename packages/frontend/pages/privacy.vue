<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
    <v-container max-width="900">


        <h1>Privacy Policy</h1>
        <br>
        <p>
            Your privacy is important to us. Please read our privacy policy to understand how we handle your
            data.
        </p>
        <br>
        <p>
            This Privacy Policy explains how
            {{ $config.public.appName }} collects, uses, and protects your
            personal information when you visit and interact with our website. By
            accessing or using our website, you agree to this Privacy Policy.
        </p>
        <br>

        <v-list>
            <v-list-item>
                <h2><strong>1. Information We Collect</strong></h2>
                We may collect the following types of information when you use
                our website:
                <br>
                <br>

                <ul>
                    <li>
                        <strong>Personal Information:</strong> This may include your
                        name, email address, and any other information you provide
                        when signing up or interacting with our website.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> We collect data on how you use
                        our website, such as your IP address, browser type, pages
                        visited, and the time spent on our site.
                    </li>
                    <li>
                        <strong>Cookies:</strong> We use cookies to enhance your
                        experience on our site. You can manage your cookie preferences
                        in your browser settings.
                    </li>
                </ul>
            </v-list-item>

            <v-list-item>

                <h2><strong>2. How We Use Your Information</strong></h2>
                We may use your personal information for the following purposes:
                <br>
                <br>
                <ul>
                    <li>
                        <strong>To Provide Services:</strong> To operate and maintain
                        our website and its features.
                    </li>
                    <li>
                        <strong>To Improve Our Services:</strong> To analyze usage
                        trends and improve the functionality of the site.
                    </li>
                    <li>
                        <strong>To Communicate with You:</strong> To send newsletters,
                        marketing materials, or updates about our services (you can
                        opt out at any time).
                    </li>
                </ul>

            </v-list-item>

            <v-list-item>

                <h2><strong>3. Data Protection and Security</strong></h2>

                We take the protection of your personal data seriously and
                implement appropriate security measures to prevent unauthorized
                access or disclosure.
                <br>
                <br>

                <ul>
                    <li>
                        <strong>Encryption:</strong> Your data is transmitted securely
                        via encryption protocols such as SSL/TLS.
                    </li>
                    <li>
                        <strong>Access Control:</strong> Only authorized personnel
                        have access to your data.
                    </li>
                    <li>
                        <strong>Data Retention:</strong> We retain your data only for
                        as long as necessary to fulfill the purposes outlined in this
                        policy.
                    </li>
                </ul>

            </v-list-item>

            <v-list-item>

                <h2><strong>4. Sharing Your Information</strong></h2>

                We may share your personal information with third parties under
                the following circumstances:
                <br>
                <br>

                <ul>
                    <li>
                        <strong>Service Providers:</strong> We may share your
                        information with third-party vendors who help us operate the
                        website and provide services to you (e.g., hosting services,
                        payment processors).
                    </li>
                    <li>
                        <strong>Legal Compliance:</strong> We may disclose your
                        information if required by law or to protect our rights or the
                        safety of others.
                    </li>
                </ul>

            </v-list-item>

            <v-list-item>

                <h2><strong>5. Your Rights</strong></h2>

                You have certain rights regarding your personal data, including:
                <br>
                <br>

                <ul>
                    <li>
                        <strong>Access:</strong> You can request access to the
                        personal data we hold about you.
                    </li>
                    <li>
                        <strong>Correction:</strong> You can request corrections to
                        any inaccurate or incomplete data.
                    </li>
                    <li>
                        <strong>Deletion:</strong> You can request that we delete your
                        personal data, subject to certain limitations.
                    </li>
                    <li>
                        <strong>Opt-out:</strong> You can opt out of receiving
                        marketing communications from us.
                    </li>
                </ul>

            </v-list-item>

            <v-list-item>

                <h2><strong>6. Cookies and Tracking Technologies</strong></h2>

                Our website uses cookies and similar tracking technologies to
                enhance your experience. You can manage your cookie preferences
                through your browser settings.
                <br>
                <br>
                <ul>
                    <li>
                        <strong>Analytics Cookies:</strong> These cookies help us
                        analyze traffic to our website and understand how visitors
                        interact with the site.
                    </li>
                    <li>
                        <strong>Advertising Cookies:</strong> These cookies help us
                        deliver personalized ads based on your preferences and
                        interests.
                    </li>
                </ul>

            </v-list-item>

            <v-list-item>

                <h2><strong>7. Changes to This Privacy Policy</strong></h2>
                <p>
                    We reserve the right to update this Privacy Policy from time to
                    time. Any changes will be posted on this page with the updated
                    date.
                </p>

            </v-list-item>

            <v-list-item>

                <h2><strong>8. Contact Us</strong></h2>
                <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                </p>
                <ul>
                    <li>Email: {{ appConfig.socialLinks.email }}</li>
                    <li>Phone:</li>
                </ul>

            </v-list-item>
        </v-list>
        <v-btn color="primary" :to="routes.web.contact()" class="mt-4">Contact Us</v-btn>


        <br />
        <br />
        <br />
        <br />
    </v-container>
</template>
