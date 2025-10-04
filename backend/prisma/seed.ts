import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    // Create default users
    const defaultUsers = [
        { uniqueId: 'admin01', name: 'Admin', email: 'admin@email.com', password: 'password' },
    ]

    console.log('Start seeding users...')
    // Seed users
    for (const userData of defaultUsers) {
        const user = await prisma.user.upsert({
            where: { uniqueId: userData.uniqueId },
            update: {},
            create: userData,
        })
        console.log(`Created user: ${user.name}`)
    }

    console.log('Users seeding finished.')

    // Create default tags
    const defaultTags = [
        { name: 'Twitter' },
        { name: 'Youtube' },
        { name: 'Docs' },
        { name: 'Link' }
    ]

    console.log('Start seeding tags...')
    // Seed tags
    for (const tagData of defaultTags) {
        const tag = await prisma.tag.upsert({
            where: { name: tagData.name },
            update: {},
            create: tagData,
        })
        console.log(`Created tag: ${tag.name}`)
    }

    console.log('Tags seeding finished.')

    // Create default contents
    const defaultContents = [
        { uniqueId: 'clh7x1y4k0000pr8qg1h2k3m9', title: 'Introduction to React Hooks', content: 'React Hooks are a powerful feature that allows you to use state and lifecycle features in functional components. This comprehensive guide covers useState, useEffect, and custom hooks with practical examples.', url: 'https://example.com/react-hooks-guide', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0001pr8qg2h5k7n2', title: 'Database Optimization Techniques', content: 'Learn advanced database optimization techniques including indexing strategies, query optimization, and performance tuning. This article covers practical examples for PostgreSQL and MySQL databases.', url: 'https://example.com/database-optimization', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0002pr8qg3h8k1m4', title: 'Machine Learning Fundamentals', content: 'Explore the basics of machine learning including supervised and unsupervised learning, neural networks, and practical applications in modern software development.', url: 'https://example.com/ml-fundamentals', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0003pr8qg4h9k5n7', title: 'CSS Grid Layout Mastery', content: 'Master CSS Grid Layout with this comprehensive tutorial. Learn how to create responsive layouts, handle complex designs, and optimize for different screen sizes.', url: 'https://example.com/css-grid-mastery', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0004pr8qg5h2k8m1', title: 'Node.js Performance Tuning', content: 'Optimize your Node.js applications for better performance. This guide covers memory management, event loop optimization, and clustering techniques.', url: 'https://example.com/nodejs-performance', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0005pr8qg6h3k9n5', title: 'Docker Container Best Practices', content: 'Learn Docker containerization best practices including image optimization, security considerations, and multi-stage builds for production environments.', url: 'https://example.com/docker-best-practices', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0006pr8qg7h4k2m8', title: 'JavaScript ES2023 Features', content: 'Discover the latest JavaScript ES2023 features including new array methods, improved async/await patterns, and performance enhancements.', url: 'https://example.com/js-es2023-features', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0007pr8qg8h5k6n2', title: 'GraphQL API Design Patterns', content: 'Design scalable GraphQL APIs with these proven patterns. Learn about schema design, resolver optimization, and security best practices.', url: 'https://example.com/graphql-patterns', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0008pr8qg9h6k3m4', title: 'TypeScript Advanced Concepts', content: 'Deep dive into advanced TypeScript concepts including conditional types, mapped types, and template literal types for better type safety.', url: 'https://example.com/typescript-advanced', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0009pr8qg1h7k7n8', title: 'MongoDB Aggregation Pipeline', content: 'Master MongoDB aggregation pipeline for complex data transformations. Learn about stages, operators, and performance optimization techniques.', url: 'https://example.com/mongodb-aggregation', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0010pr8qg2h8k4m1', title: 'Vue.js Composition API Guide', content: 'Learn Vue.js 3 Composition API with practical examples. Understand reactive references, computed properties, and lifecycle hooks in the new paradigm.', url: 'https://example.com/vue-composition-api', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0011pr8qg3h9k8n5', title: 'AWS Lambda Serverless Functions', content: 'Build and deploy serverless functions with AWS Lambda. This guide covers function design, event triggers, and cost optimization strategies.', url: 'https://example.com/aws-lambda-guide', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0012pr8qg4h1k5m2', title: 'Python Data Science Toolkit', content: 'Comprehensive guide to Python data science libraries including Pandas, NumPy, Matplotlib, and Scikit-learn for data analysis and visualization.', url: 'https://example.com/python-data-science', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0013pr8qg5h2k9n6', title: 'Kubernetes Deployment Strategies', content: 'Learn Kubernetes deployment strategies including rolling updates, blue-green deployments, and canary releases for production environments.', url: 'https://example.com/kubernetes-deployments', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0014pr8qg6h3k6m9', title: 'Redis Caching Optimization', content: 'Optimize application performance with Redis caching strategies. Learn about data structures, expiration policies, and cluster configuration.', url: 'https://example.com/redis-optimization', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0015pr8qg7h4k2n3', title: 'React Native Mobile Development', content: 'Build cross-platform mobile apps with React Native. This guide covers navigation, native modules, and platform-specific optimizations.', url: 'https://example.com/react-native-dev', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0016pr8qg8h5k7m6', title: 'Microservices Architecture Patterns', content: 'Design scalable microservices architectures using proven patterns. Learn about service discovery, circuit breakers, and distributed tracing.', url: 'https://example.com/microservices-patterns', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0017pr8qg9h6k3n7', title: 'Webpack 5 Module Federation', content: 'Implement micro-frontends with Webpack 5 Module Federation. Learn about shared dependencies, runtime loading, and deployment strategies.', url: 'https://example.com/webpack-module-federation', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0018pr8qg1h7k8m4', title: 'PostgreSQL Query Optimization', content: 'Optimize PostgreSQL queries for better performance. Learn about indexing strategies, query planning, and database tuning techniques.', url: 'https://example.com/postgresql-optimization', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0019pr8qg2h8k4n1', title: 'Angular Reactive Forms', content: 'Master Angular reactive forms with validation, dynamic form controls, and custom validators. Build robust form handling in Angular applications.', url: 'https://example.com/angular-reactive-forms', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0020pr8qg3h9k9m8', title: 'Git Advanced Workflows', content: 'Master advanced Git workflows including rebasing, cherry-picking, and conflict resolution. Learn branching strategies for team collaboration.', url: 'https://example.com/git-advanced-workflows', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0021pr8qg4h1k5n2', title: 'Elasticsearch Query DSL', content: 'Learn Elasticsearch Query DSL for powerful search capabilities. Master full-text search, aggregations, and performance optimization techniques.', url: 'https://example.com/elasticsearch-query-dsl', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0022pr8qg5h2k6m5', title: 'Flutter Cross-Platform Development', content: 'Build beautiful cross-platform mobile apps with Flutter. Learn widgets, state management, and platform integration techniques.', url: 'https://example.com/flutter-development', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0023pr8qg6h3k7n9', title: 'Spring Boot Microservices', content: 'Develop microservices with Spring Boot. Learn about service configuration, data access patterns, and security implementation.', url: 'https://example.com/spring-boot-microservices', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0024pr8qg7h4k8m2', title: 'Terraform Infrastructure as Code', content: 'Manage infrastructure with Terraform. Learn about resource management, state handling, and multi-environment deployments.', url: 'https://example.com/terraform-infrastructure', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0025pr8qg8h5k9n6', title: 'Next.js Full-Stack Development', content: 'Build full-stack applications with Next.js. Learn about API routes, server-side rendering, and static site generation.', url: 'https://example.com/nextjs-fullstack', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0026pr8qg9h6k1m3', title: 'Apache Kafka Stream Processing', content: 'Process real-time data streams with Apache Kafka. Learn about topics, partitions, and stream processing patterns.', url: 'https://example.com/kafka-stream-processing', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0027pr8qg1h7k2n7', title: 'Rust Systems Programming', content: 'Learn systems programming with Rust. Understand ownership, borrowing, and memory safety in low-level programming.', url: 'https://example.com/rust-systems-programming', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0028pr8qg2h8k3m1', title: 'OAuth 2.0 Security Implementation', content: 'Implement OAuth 2.0 authentication and authorization. Learn about grant types, token management, and security best practices.', url: 'https://example.com/oauth2-security', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0029pr8qg3h9k4n4', title: 'Phoenix LiveView Real-time Apps', content: 'Build real-time applications with Phoenix LiveView. Learn about interactive components, real-time updates, and state management.', url: 'https://example.com/phoenix-liveview', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0030pr8qg4h1k5m8', title: 'Svelte Modern Web Development', content: 'Build fast web applications with Svelte. Learn about reactive statements, component lifecycle, and build optimization.', url: 'https://example.com/svelte-development', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0031pr8qg5h2k6n1', title: 'Jenkins CI/CD Pipeline Automation', content: 'Automate deployment pipelines with Jenkins. Learn about build stages, testing integration, and deployment strategies.', url: 'https://example.com/jenkins-cicd-pipeline', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0032pr8qg6h3k7m5', title: 'Go Concurrent Programming', content: 'Master concurrent programming in Go. Learn about goroutines, channels, and synchronization patterns for scalable applications.', url: 'https://example.com/go-concurrent-programming', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0033pr8qg7h4k8n9', title: 'Django REST API Development', content: 'Build robust REST APIs with Django REST Framework. Learn about serializers, authentication, and API versioning strategies.', url: 'https://example.com/django-rest-api', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0034pr8qg8h5k9m2', title: 'Unity Game Development Fundamentals', content: 'Learn game development with Unity engine. Understand game objects, scripts, physics, and 2D/3D game creation techniques.', url: 'https://example.com/unity-game-development', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0035pr8qg9h6k1n6', title: 'Blockchain Smart Contract Development', content: 'Develop smart contracts on blockchain platforms. Learn Solidity programming and decentralized application deployment.', url: 'https://example.com/blockchain-smart-contracts', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0036pr8qg1h7k2m3', title: 'Hadoop Big Data Processing', content: 'Process big data with Hadoop ecosystem. Learn about HDFS, MapReduce, and distributed computing patterns.', url: 'https://example.com/hadoop-big-data', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0037pr8qg2h8k3n7', title: 'React Testing Library Best Practices', content: 'Test React applications effectively with Testing Library. Learn about component testing, mocking, and integration testing strategies.', url: 'https://example.com/react-testing-library', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0038pr8qg3h9k4m1', title: 'Nginx Load Balancing Configuration', content: 'Configure Nginx for load balancing and reverse proxy. Learn about upstream servers, health checks, and SSL termination.', url: 'https://example.com/nginx-load-balancing', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0039pr8qg4h1k5n4', title: 'Ruby on Rails API Development', content: 'Build RESTful APIs with Ruby on Rails. Learn about Active Record, serializers, and authentication implementation.', url: 'https://example.com/rails-api-development', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0040pr8qg5h2k6m8', title: 'Swift iOS App Development', content: 'Develop iOS applications with Swift. Learn about UIKit, SwiftUI, and iOS-specific design patterns and frameworks.', url: 'https://example.com/swift-ios-development', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0041pr8qg6h3k7n1', title: 'Ansible Configuration Management', content: 'Automate infrastructure management with Ansible. Learn about playbooks, roles, and configuration deployment strategies.', url: 'https://example.com/ansible-configuration', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0042pr8qg7h4k8m5', title: 'GraphQL Federation Architecture', content: 'Implement GraphQL federation for microservices. Learn about schema stitching, gateway configuration, and distributed schemas.', url: 'https://example.com/graphql-federation', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0043pr8qg8h5k9n9', title: 'Kotlin Android Development', content: 'Build Android applications with Kotlin. Learn about coroutines, Android Architecture Components, and modern development practices.', url: 'https://example.com/kotlin-android-dev', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0044pr8qg9h6k1m2', title: 'Prometheus Monitoring Setup', content: 'Implement application monitoring with Prometheus. Learn about metrics collection, alerting rules, and Grafana integration.', url: 'https://example.com/prometheus-monitoring', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0045pr8qg1h7k2n6', title: 'FastAPI Python Web Framework', content: 'Build high-performance APIs with FastAPI. Learn about automatic documentation, dependency injection, and async programming.', url: 'https://example.com/fastapi-framework', tagId: 2, userId: 1 },
        { uniqueId: 'clh7x1y4k0046pr8qg2h8k3m9', title: 'Electron Desktop App Development', content: 'Create cross-platform desktop applications with Electron. Learn about main/renderer processes and native integration.', url: 'https://example.com/electron-desktop-apps', tagId: 4, userId: 1 },
        { uniqueId: 'clh7x1y4k0047pr8qg3h9k4n3', title: 'Apache Spark Data Processing', content: 'Process large datasets with Apache Spark. Learn about RDDs, DataFrames, and distributed computing optimization.', url: 'https://example.com/apache-spark-processing', tagId: 3, userId: 1 },
        { uniqueId: 'clh7x1y4k0048pr8qg4h1k5m6', title: 'Tailwind CSS Utility Framework', content: 'Style applications efficiently with Tailwind CSS. Learn about utility classes, responsive design, and component patterns.', url: 'https://example.com/tailwind-css-framework', tagId: 1, userId: 1 },
        { uniqueId: 'clh7x1y4k0049pr8qg5h2k6n2', title: 'Deno JavaScript Runtime', content: 'Explore modern JavaScript runtime with Deno. Learn about built-in TypeScript support, security model, and standard library.', url: 'https://example.com/deno-javascript-runtime', tagId: 2, userId: 1 }
    ]

    console.log('Start seeding contents...')
    // Seed contents
    for (const contentData of defaultContents) {
        const content = await prisma.content.upsert({
            where: { uniqueId: contentData.uniqueId },
            update: {},
            create: contentData,
        })
        console.log(`Created content: ${content.title}`)
    }
    console.log('Contents seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })