import React from 'react'
import NavBar from '../Component/NavBar'
import Footer from '../Component/Footer'
import {
    Box,
    Container,
    Heading,
    Text,
    UnorderedList,
    ListItem,
    Link,
    Divider,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react';
const Service = () => {
  return (
    <>
        <NavBar/>
        <Container maxW="container.md" py={10}>
      <Heading as="h1" mb={6}>
         Privacy Policy
      </Heading>
      <Alert status="info" variant="subtle" mb={6}>
        <AlertIcon />
        Payment Assurance Alert
        <Text ml={2}  opacity=".8">
          Please Note: Showrity is only responsible for payment of projects obtained from the Showrity platform. Choose security, choose us!
        </Text>
      </Alert>
      <Divider my={6} />
      <Heading as="h2" size="md" mb={4}>
        Introduction:
      </Heading>

      <Text mb={4} opacity=".8">
        Welcome to Showrity, your dedicated freelancing job portal. At Showrity, we are committed to protecting the privacy of our users, including clients and freelancers. This Privacy Policy outlines how we collect, process, and safeguard your personal information.
      </Text>

      <Heading as="h2" size="md" mb={4}>
        Information We Collect:
      </Heading>

      <Text mb={4} opacity=".8"> 
      1. Information You Provide: When you register, use the site, complete forms, or participate in skills tests or surveys, we collect personal information such as your email address, Facebook or Google account details, username, name, profile details, address, billing information, telephone number, transactional details, payment information, taxpayer information, social network accounts, details about listed gigs, education, profession, expertise, and additional authentication information.
      </Text>
      <Text mb={4} opacity=".8"> 
2. Information We Collect Automatically: We gather information about your site usage, including transactions, communications with other users, searches, pages visited, geo-location, IP address, device details, browser information, web-log information, and URLs. This information helps us provide services, enhance user experience, and monitor the site for fraud prevention.
</Text>
<Text mb={4} opacity=".8"> 

3. Information We Receive from Third Parties: We receive data from third-party vendors, service providers, and commercially available sources. This includes fraud warnings, enrichment service data, information from social media platforms, data from G-suite contacts, and details from third-party integrations.
      </Text>
      <Divider my={6} />
      <Heading as="h2" size="md" mb={4}>
      Legal Basis for Using Your Personal Information:
      </Heading>
      <Text mb={4} opacity=".8"> 
      Under applicable laws, the processing of your personal information is justified based on lawful grounds, including consent, necessity for contractual performance, compliance with legal obligations, and pursuit of legitimate business interests.
      </Text>

      <Heading as="h2" size="md" mb={4}>
      How We Use the Information Collected:
      </Heading>
      <Text mb={4} opacity=".8"> 
      We utilize your personal information for various purposes, including providing services, maintaining marketplace integrity, preventing fraud, contacting you, promoting and advertising the site, complying with legal obligations, and improving our services.
      </Text>


      <Heading as="h2" size="md" mb={4}>
      How Long Do We Keep Personal Information:
      </Heading>
      <Text mb={4} opacity=".8"> 
      We retain personal information for as long as necessary to fulfill the purpose for which it was collected. We may keep data for extended periods in certain circumstances, such as legal compliance, fraud prevention, and business records.
      </Text>



      <Heading as="h2" size="md" mb={4}>
      Children:
      </Heading>
      <Text mb={4} opacity=".8"> 
       is for users aged 18 and above. Minors aged 13 to 18 may use the site with a parent or guardian's account. Users under 13 are not allowed, and we do not knowingly collect their personal information.
      </Text>


      <Heading as="h2" size="md" mb={4}>
      Sharing Information with Third Parties:
      </Heading>
      <Text mb={4} opacity=".8"> 
      We do not sell or rent personal information for marketing purposes without explicit consent. We share information with other users, service providers, law enforcement, payment processors, social media partners, corporate affiliates, and in corporate transactions only with your consent.

We ensure that confidential information is never leaked in the process without your consent and requirement and that the project is reserved between the concerned client and the developer with utmost safety and without any third-party involvement. 

      </Text>



      <Heading as="h2" size="md" mb={4}>
      Cookies:
      </Heading>
      <Text mb={4} opacity=".8"> 
      We use cookies and similar technologies for enhancing user experience, providing services, analyzing performance, and marketing. 

      </Text>


      <Heading as="h2" size="md" mb={4}>
      External Links:
      </Heading>
      <Text mb={4} opacity=".8"> 
      Links to third-party sites are not under our control and are not subject to this Policy. Users should carefully read and review the privacy policies of external sites.

      </Text>


      <Heading as="h2" size="md" mb={4}>
      Security: 
      </Heading>
      <Text mb={4} opacity=".8"> 
      We implement technical and organizational measures to secure the site and personal information. While we strive for security, data transmission over the internet is not entirely secure. 

      </Text>

      <Heading as="h2" size="md" mb={4}>
      Payment
      </Heading>
      <Text mb={4} opacity=".8"> 
      We have a very secure and unique payment method. At Showrity, we respect your effort and hard work and ensure that your hard work gets paid rightly. 

We take 10% of the payment from the clients before you start putting in your effort and keep it with ourselves while you complete the project, ensuring that even if the client leaves the project in between, your efforts won't be wasted, and you get the amount that we have locked. 

Our payment method is equally secure and beneficial for clients as we ensure the quality of the project and only ask you to pay the full amount on the completion of the project and with your complete satisfaction and full-fledged testing. 


      </Text>


      <Divider my={6} />

      <Text fontSize="sm"  opacity=".8">
        This overview highlights our commitment to privacy. For a better understanding, please refer to the detailed version of our Privacy Policy.
      </Text>
      
      {/* Add additional sections as needed */}

    </Container>
    <Footer/>
    </>
  )
}

export default Service
