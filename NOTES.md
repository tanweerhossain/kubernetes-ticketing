## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 4. What Is a Microservice?

<pre>
     <div><h4><strong>Micro-Service</strong> </h4><p>A micro-service is defined as a set of code containing routing, middle-wares, business logic and required database access to <em>implement one feature</em> of the app.</p><h4><strong>Monolith</strong></h4><p>A monolith is defined as a set of code containing routing, middle-wares, business logic and required database access to<em> implement all features</em> of the app.</p></div>
</pre>

## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 5. Data in Microservices

<pre>
     <div><h4><strong>Benefits of Database-Per-Service:</strong></h4><p>or</p><h4><strong>Benefits of Micro-services over Monolithic Servers:</strong></h4><ol><li><p>Each service will run independently of others.</p><ol><li><p><em>Means: If one feature crashes will not effect other features.</em></p></li></ol></li><li><p>Database structure/schema might change unexpectedly during development, which might lead to crash only one feature rather affecting others.</p></li><li><p>Each service will work efficiently with particular databases and with micro-service it is easy to achieve it.</p></li></ol></div>
</pre>

## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 6. Big Problems with Data

<pre>
     <div><h4><strong>Demerits of Database-Per-Service Or Micro-Services:</strong></h4><ul><li><p>Data management between services</p></li></ul></div>
</pre>

## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 7. Sync Communication Between Services

<pre>
     <div><h4><strong>Communication Strategies between Services</strong></h4><ol><li><p>Synchronized Communication</p><ul><li><p>Services communicate with each other using direct requests</p></li></ul></li><li><p>Asynchronized Communication</p><ul><li><p>Services communicate with each other using events</p></li></ul></li></ol></div>
</pre>

## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 8. Event-Based Communication

<pre>
     <div><h4><strong>Synchronized Communication</strong></h4><ul><li><p>Merits</p><ol><li><p>Sometime services don't require database as they rely on other service(s).</p></li></ol></li><li><p>Demerits</p><ol><li><p>Introduces dependencies between services - Service will fail if one of the dependent service(s) fails.</p></li><li><p>If any inter-service request fails, the overall request fails.</p></li><li><p>RTT(Round Trip Time) for the service will increase as compared to its dependent services.</p></li></ol></li></ul></div>
</pre>

## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 8. Event-Based Communication

<pre>
     <div><h4><strong>Asynchronized Communication</strong></h4><ol><li><p>It uses Event Bus to communicate between services</p><ul><li><p>A service(say S2) emits an event of object consisting of type and data to Event bus which then forwarded it to the respective service(say S1). Based on the event object S1 service will emits another event object consisting of the result to Event bus which then carry forwarded to S2 service to process.</p></li></ul></li><li><p>The dependent service(S2) will have a DB which contain all the data which was received by other services. These services(S1) pass the data to the service(S2) via Event Bus to save it it its DB. By this approach each service will be independent of other.</p></li></ol></div>
</pre>

## Section - 1. Fundamental Ideas Around Microservices

### Lecture - 10. Pros and Cons of Async Communication

<pre>
     <div><h4><strong>Benefits of Async Communication:</strong></h4><ol><li><p>Each services has zero dependencies on other services</p></li><li><p>RTT(Round-Trip-Time) for the service will decrease as compared to synchronous communication having dependent services.</p></li></ol><h4><strong>Demerits of Async Communication:</strong></h4><ol><li><p>Data Duplication</p></li><li><p>Harder to understand</p></li></ol></div>
</pre>

## Section - 2. A Mini-Microservices App

### Lecture - 13. Posts Service Creation

<pre>
     <div><p><strong>Use of body-parser in node:</strong></p><ol><li><p>Its indicates nodejs to parse the request body before getting passed to router function in desired format. </p></li></ol></div>
</pre>

## Section - 2. A Mini-Microservices App

### Lecture - 22. Fetching and Rendering Posts

<pre>
     <div><p><strong>CORS </strong><em>( </em><strong><em>C</em></strong><em>ross </em><strong><em>O</em></strong><em>rigin </em><strong><em>R</em></strong><em>esource </em><strong><em>S</em></strong><em>haring )</em></p><p><strong>Cross-Origin Resource Sharing</strong> (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading of resources.</p></div>
</pre>

## Section - 2. A Mini-Microservices App

### Lecture - 29. Event Bus Overview

<pre>
     <div><p><strong>Services available for Event Bus</strong></p><ul><li><p>RabbitMQ</p></li><li><p>Kafka</p></li><li><p>NATS</p></li><li><p>etc....</p></li></ul></div>
</pre>

## Section - 3. Running Services with Docker

### Lecture - 55. Why Kubernetes?

<pre>
     <div><p><strong>What is Container?</strong></p><p>A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.</p><p><strong>What is Kubernetes?</strong></p><p>Kubernetes is a tool for<strong><em> running a bunch of containers</em></strong> where the user/system-admin provide some configuration to describe how containers will run and interact with each-others.</p></div>
</pre>

## Section - 4. Orchestrating Collections of Services with Kubernetes

### Lecture - 64. Important Kubernetes Terminology

<pre>
     <div><p><strong>Kubernetes Cluster</strong></p><p>Kubernetes is defined as a master process to manage the collection of nodes.</p><p><strong>Node in Kubernetes</strong></p><p>Node is defines as a virtual machine that will run the container.</p><p><strong>Pod in Kubernetes</strong></p><p><em>Pods</em> are the smallest deploy-able units of computing that you can create and manage in Kubernetes. A pod can run multiple containers.</p><p><strong>Deployment in Kubernetes</strong></p><p>A Kubernetes Deployment is used to tell Kubernetes how to manage instances of the pods that hold a containerized application. It restart the pods if they crashed.</p><p><strong>Service in Kubernetes</strong></p><p>Services provides an easy to remember URL to access a running container.</p><p><br></p></div>
</pre>

## Section - 4. Orchestrating Collections of Services with Kubernetes

### Lecture - 66. Creating a Pod

<pre>
     <div><p><strong>Kubernetes sample config file for running pod</strong></p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">apiVersion</span><span class="pun">:</span><span class="pln">&nbsp;v1</span></li><li class="L1"><span class="pln">kind</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">Pod</span></li><li class="L2"><span class="pln">metadata</span><span class="pun">:</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L4"><span class="pln">spec</span><span class="pun">:</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;containers</span><span class="pun">:</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">-</span><span class="pln">&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L7"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span><span class="pun">:</span><span class="pln">&nbsp;blog</span><span class="pun">/</span><span class="pln">posts</span><span class="pun">:</span><span class="lit">0.0</span><span class="pun">.</span><span class="lit">1</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imagePullPolicy</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">Never</span></li></ol></pre></div></div></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 66. Creating a Pod
<pre>
     <div><p><strong>Kubernetes related commands for pod</strong></p><ol><li><p>kubectl get pods -&gt; <em>Print out information about all of the running pods</em></p></li><li><p>kubectl exec -it [pod-name] [cmd] -&gt; <em>Execute the given command in a running pod</em></p></li><li><p>kubectl logs [pod-name] -<strong>&gt; </strong><em>Print out logs from the given pod</em></p></li><li><p>kubectl delete pod [pod-name] -&gt; <em>Deletes the given pod</em></p></li><li><p>kubectl apply -f [config file name] -&gt; <em>Tells kubernetes to process the config</em></p></li><li><p>kubectl describe pod [pod-name] -&gt; <em>Print out some information about the running pod</em></p></li></ol></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 66. Creating a Pod
<pre>
     <div><p><strong>Docker related commands</strong></p><ol><li><p>docker build -t [tag-name] . <em>-&gt; Build an image based on the dockerfile in the current directory</em></p></li><li><p>docker run [image-id or image-tag] -&gt; <em>Create and start a container based on the provided image id or tag</em></p></li><li><p>docker run -it [image-id or image-tag] [cmd] -&gt; <em>Create and start container, but also override the default command</em></p></li><li><p>docker ps -&gt; <em>Print out information about all of the running containers</em></p></li><li><p>docker exec -it [container id] [cmd] -&gt; <em>Execute the given command in a running container</em></p></li><li><p>docker logs [container id] -&gt; <em>Print out logs from the given container</em></p></li></ol></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 72. Creating a Deployment
<pre>
     <div><p><strong>Kubernetes related commands for deployment</strong></p><ol><li><p>&nbsp; &nbsp; kubectl get deployments -&gt; <em>Print out information about all of the running deployments</em></p></li><li><p>&nbsp; &nbsp; kubectl exec -it [deployment-name] [cmd] -&gt; <em>Execute the given command in a running deployment</em></p></li><li><p>&nbsp; &nbsp; kubectl delete deployment [deployment-name] -&gt; <em>Deletes the given deployment</em></p></li><li><p>&nbsp; &nbsp; kubectl apply -f [config file name] -&gt; <em>Tells kubernetes to process the config</em></p></li><li><p>&nbsp; &nbsp; kubectl describe deployment [deployment-name] -&gt; <em>Print out some information about the running deployment</em></p></li></ol></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 74. Updating Deployments
<pre>
     <div><p><strong>Kubernetes sample config file for running deployment</strong></p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">apiVersion</span><span class="pun">:</span><span class="pln">&nbsp;apps</span><span class="pun">/</span><span class="pln">v1</span></li><li class="L1"><span class="pln">kind</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">Deployment</span></li><li class="L2"><span class="pln">metadata</span><span class="pun">:</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;posts</span><span class="pun">-</span><span class="pln">deployment</span></li><li class="L4"><span class="pln">spec</span><span class="pun">:</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;replicas</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="lit">1</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;selector</span><span class="pun">:</span></li><li class="L7"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;matchLabels</span><span class="pun">:</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L9"><span class="pln">&nbsp;&nbsp;</span><span class="kwd">template</span><span class="pun">:</span></li><li class="L0"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;metadata</span><span class="pun">:</span></li><li class="L1"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels</span><span class="pun">:</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;spec</span><span class="pun">:</span></li><li class="L4"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers</span><span class="pun">:</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">-</span><span class="pln">&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image</span><span class="pun">:</span><span class="pln">&nbsp;blog</span><span class="pun">/</span><span class="pln">posts</span><span class="pun">:</span><span class="lit">0.0</span><span class="pun">.</span><span class="lit">1</span></li></ol></pre></div></div></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 76. Networking With Services
<pre>
     <div><h4><strong>Types of Services</strong></h4><ol><li><p><strong>Cluster IP :</strong> Sets up an easy-to-remember URL to access a pod. Only exposes pods <em>in the cluster</em></p></li><li><p><strong>Node Port : </strong>Makes a pod accessible from <em>outside the cluster</em>. Usually only used for dev purposes</p></li><li><p><strong>Load Balancer : </strong>Makes a pod accessible from <em>outside the cluster</em>. This is the right way to expose a pod to the outside world</p></li><li><p><strong>External Name : </strong>Redirects an in-cluster request to a CNAME url</p></li></ol><p><br></p></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 78. Accessing NodePort Services
<pre>
     <div><p><strong>Kubernetes sample config file for configuring NodePort Service</strong></p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">apiVersion</span><span class="pun">:</span><span class="pln">&nbsp;v1</span></li><li class="L1"><span class="pln">kind</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">Service</span></li><li class="L2"><span class="pln">metadata</span><span class="pun">:</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;posts</span><span class="pun">-</span><span class="pln">srv</span></li><li class="L4"><span class="pln">spec</span><span class="pun">:</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;type</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">NodePort</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;selector</span><span class="pun">:</span></li><li class="L7"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;app</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;ports</span><span class="pun">:</span></li><li class="L9"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">-</span><span class="pln">&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;posts</span></li><li class="L0"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protocol</span><span class="pun">:</span><span class="pln">&nbsp;TCP</span></li><li class="L1"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="lit">4000</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;targetPort</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="lit">4000</span></li></ol></pre></div></div></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 79. Setting Up Cluster IP Services
<pre>
     <div><blockquote><ul><li><p><strong>Kubernetes deployment command to pull the image of the container</strong></p><ul><li><p><em>docker push [image-name]</em></p></li></ul></li><li><p><strong>Kubernetes deployment command to pull the image of the container</strong></p><ul><li><p><em>kubectl rollout restart deployment [deployment-name]</em></p></li></ul></li></ul></blockquote></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 88. Load Balancers and Ingress
<pre>
     <div><p><strong>Ingress or Ingress Controller</strong></p><p>A pod with a set of routing rules to distribute traffic to other services.</p></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 88. Load Balancers and Ingress
<pre>
     <div><p><strong>Kubernetes sample config file for configuring ClusterIP Service</strong></p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">apiVersion</span><span class="pun">:</span><span class="pln">&nbsp;v1</span></li><li class="L1"><span class="pln">kind</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">Service</span></li><li class="L2"><span class="pln">metadata</span><span class="pun">:</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;moderation</span><span class="pun">-</span><span class="pln">clustertip</span><span class="pun">-</span><span class="pln">srv</span></li><li class="L4"><span class="pln">spec</span><span class="pun">:</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;type</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">ClusterIP</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;selector</span><span class="pun">:</span></li><li class="L7"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;app</span><span class="pun">:</span><span class="pln">&nbsp;moderation</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;ports</span><span class="pun">:</span></li><li class="L9"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">-</span><span class="pln">&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;moderation</span></li><li class="L0"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protocol</span><span class="pun">:</span><span class="pln">&nbsp;TCP</span></li><li class="L1"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="lit">4003</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;targetPort</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="lit">4003</span></li></ol></pre></div></div></div>
</pre>
## Section - 4. Orchestrating Collections of Services with Kubernetes
### Lecture - 99. Introducing Skaffold
<pre>
     <div><h4><strong>Skaffold</strong></h4><ol><li><p>Automates many task in Kubernetes for dev environment</p></li><li><p>Make it really easy to update code in running pod</p></li><li><p>Makes it really easy to create/delete all objects tied to a project at once.</p></li><li><p>Link: https://skaffold.dev/</p></li></ol></div>
</pre>
## Section - 6. Leveraging a Cloud Environment for Development
### Lecture - 123. Installing the GCloud Context
<pre>
     <div><p><br></p><blockquote><p><strong>List all the Contexts in a </strong><code><strong>kubeconfig</strong></code><strong> file:</strong></p><p><em>kubectl config get-contexts</em></p><p><strong>Switch Context:</strong></p><p><em>kubectl config use-context &lt;context_name&gt;</em></p></blockquote></div>
</pre>
## Section - 9. Authentication Strategies and Options
### Lecture - 168. Microservices Auth Requirements
<pre>
     <div><p><strong>Cookie Based Authentication:</strong></p><p>https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide</p><p><strong>JWT Based Authentication</strong></p><p>https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide</p></div>
</pre>
## Section - 9. Authentication Strategies and Options
### Lecture - 175. Creating and Accessing Secrets
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="com">##&nbsp;Kubernetes&nbsp;**Secret&nbsp;Service**&nbsp;commands&nbsp;need&nbsp;to&nbsp;run&nbsp;manually&nbsp;in&nbsp;dev&nbsp;but&nbsp;required&nbsp;a&nbsp;config&nbsp;file&nbsp;for&nbsp;prod&nbsp;deployment&nbsp;**_[Required&nbsp;research]_**</span></li><li class="L1"><span class="pln">&nbsp;</span></li><li class="L2"><span class="pun">&gt;</span><span class="pln">&nbsp;kubectl&nbsp;create&nbsp;secret&nbsp;</span><span class="kwd">generic</span><span class="pln">&nbsp;jwt</span><span class="pun">-</span><span class="pln">secret&nbsp;</span><span class="pun">--</span><span class="kwd">from</span><span class="pun">-</span><span class="pln">literal</span><span class="pun">=</span><span class="pln">JWT_KEY</span><span class="pun">=</span><span class="pln">sdfd23kdwopewqiukc</span></li><li class="L3"><span class="pln">&nbsp;</span></li><li class="L4"><span class="com">##&nbsp;How&nbsp;to&nbsp;get&nbsp;secrets</span></li><li class="L5"><span class="pun">&gt;</span><span class="pln">&nbsp;kubectl&nbsp;</span><span class="kwd">get</span><span class="pln">&nbsp;secrets</span></li></ol></pre></div></div></div>
</pre>
## Section - 11. Integrating a Server-Side-Rendered React App
### Lecture - 208. Reminder on Server Side Rendering
<pre>
     <div><h4><strong>Why Server-Side-Rendering Approach is essential</strong></h4><ol><li><p>User receives the content more quickly as compare to <em>client-side-rendering </em>as it serves the content on one request. It helps when the user access the content in mobile device.</p></li><li><p>It tends to perform better with <strong>Search Engine Optimization(SEO)</strong></p></li></ol></div>
</pre>
## Section - 11. Integrating a Server-Side-Rendered React App
### Lecture - 228. When is GetInitialProps Called?
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="com">/**&nbsp;How&nbsp;to&nbsp;call&nbsp;different&nbsp;services&nbsp;inside&nbsp;a&nbsp;container</span></li><li class="L1"><span class="com">&nbsp;*&nbsp;&nbsp;1.&nbsp;By&nbsp;using&nbsp;cluster&nbsp;IP&nbsp;as&nbsp;configured</span></li><li class="L2"><span class="com">&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hostname:&nbsp;&lt;clusterIp-service-name&gt;</span></li><li class="L3"><span class="com">&nbsp;*&nbsp;&nbsp;2.&nbsp;By&nbsp;using&nbsp;load-balancer(here&nbsp;ingress-nginx)&nbsp;IP.</span></li><li class="L4"><span class="com">&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here&nbsp;ingress-nginx&nbsp;is&nbsp;running&nbsp;in&nbsp;different&nbsp;namespace.</span></li><li class="L5"><span class="com">&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This&nbsp;type&nbsp;of&nbsp;communication&nbsp;is&nbsp;known&nbsp;as&nbsp;cross-namespace-service&nbsp;communication</span></li><li class="L6"><span class="com">&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hostname:&nbsp;&nbsp;&lt;name-of-service&gt;.&lt;namespace&gt;.svc.cluster.local</span></li><li class="L7"><span class="com">&nbsp;*/</span></li></ol></pre></div></div></div>
</pre>
## Section - 11. Integrating a Server-Side-Rendered React App
### Lecture - 228. When is GetInitialProps Called?
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="com">//&nbsp;This&nbsp;will&nbsp;run&nbsp;on&nbsp;Client&nbsp;Machine</span></li><li class="L1"><span class="kwd">const</span><span class="pln">&nbsp;</span><span class="typ">Component</span><span class="pln">&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;</span><span class="pun">(</span><span class="kwd">object</span><span class="pun">)</span><span class="pln">&nbsp;</span><span class="pun">=&gt;</span><span class="pln">&nbsp;</span><span class="pun">(</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;</span><span class="str">&lt;div&gt;</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">{</span><span class="kwd">object</span><span class="pun">}</span></li><li class="L4"><span class="pln">&nbsp;&nbsp;</span><span class="pun">&lt;/</span><span class="pln">div</span><span class="pun">&gt;</span></li><li class="L5"><span class="pun">)</span></li><li class="L6"><span class="pln">&nbsp;</span></li><li class="L7"><span class="typ">Component</span><span class="pun">.</span><span class="pln">getInitialProps&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;</span><span class="pun">()</span><span class="pln">&nbsp;</span><span class="pun">=&gt;</span><span class="pln">&nbsp;</span><span class="pun">{</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;</span><span class="com">/**&nbsp;Code&nbsp;run&nbsp;on&nbsp;Server&nbsp;Machine</span></li><li class="L9"><span class="com">&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp;Hard&nbsp;Refresh&nbsp;on&nbsp;Client&nbsp;Side</span></li><li class="L0"><span class="com">&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;2.&nbsp;Clicking&nbsp;link&nbsp;from&nbsp;different&nbsp;domain</span></li><li class="L1"><span class="com">&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;3.&nbsp;Typing&nbsp;URL&nbsp;into&nbsp;address&nbsp;bar</span></li><li class="L2"><span class="com">&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;Code&nbsp;run&nbsp;on&nbsp;Client&nbsp;Side</span></li><li class="L3"><span class="com">&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;1.&nbsp;Navigation&nbsp;from&nbsp;one&nbsp;page&nbsp;to&nbsp;another</span></li><li class="L4"><span class="com">&nbsp;&nbsp;&nbsp;*/</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln">&nbsp;</span><span class="kwd">object</span><span class="pun">;</span><span class="pln">&nbsp;</span></li><li class="L6"><span class="pun">}</span></li><li class="L7"><span class="pln">&nbsp;</span></li><li class="L8"><span class="kwd">export</span><span class="pln">&nbsp;</span><span class="kwd">default</span><span class="pln">&nbsp;</span><span class="typ">Component</span></li></ol></pre></div></div></div>
</pre>
## Section - 11. Integrating a Server-Side-Rendered React App
### Lecture - 231. Specifying the Host
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pun">........</span></li><li class="L1"><span class="pln">&nbsp;</span><span class="pun">*</span><span class="pln">&nbsp;&nbsp;&nbsp;</span><span class="lit">1.</span><span class="pln">&nbsp;</span><span class="typ">Navigation</span><span class="pln">&nbsp;</span><span class="kwd">from</span><span class="pln">&nbsp;one&nbsp;page&nbsp;to&nbsp;another</span></li><li class="L2"><span class="pln">&nbsp;</span><span class="pun">*</span><span class="pln">&nbsp;</span><span class="typ">Hence</span><span class="pln">&nbsp;the&nbsp;solution&nbsp;will&nbsp;be&nbsp;mention&nbsp;below</span></li><li class="L3"><span class="pln">&nbsp;</span><span class="pun">*/</span></li><li class="L4"><span class="pln">&nbsp;&nbsp;</span><span class="kwd">if</span><span class="pln">&nbsp;</span><span class="pun">(</span><span class="kwd">typeof</span><span class="pln">&nbsp;window&nbsp;</span><span class="pun">===</span><span class="pln">&nbsp;</span><span class="str">'undefined'</span><span class="pun">)</span><span class="pln">&nbsp;</span><span class="pun">{</span></li><li class="L5"><span class="com">/**&nbsp;Run&nbsp;on&nbsp;Server: Services&nbsp;url&nbsp;call&nbsp;will&nbsp;be&nbsp;by&nbsp;using&nbsp;ingress-nginx-host&nbsp;</span></li><li class="L6"><span class="com">&nbsp;*&nbsp;&nbsp;http://&lt;name-of-service&gt;.&lt;namespace&gt;.svc.cluster.local</span></li><li class="L7"><span class="com">&nbsp;*/</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">&nbsp;</span><span class="kwd">else</span><span class="pln">&nbsp;</span><span class="pun">{</span></li><li class="L9"><span class="com">/**&nbsp;Run&nbsp;on&nbsp;Client: Services&nbsp;url&nbsp;call&nbsp;will&nbsp;be&nbsp;by&nbsp;using&nbsp;domain&nbsp;name&nbsp;http://domain</span></li><li class="L0"><span class="com">&nbsp;*/</span></li><li class="L1"><span class="pln">&nbsp;&nbsp;</span><span class="pun">}</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln">&nbsp;obj</span><span class="pun">;</span><span class="pln">&nbsp;</span></li><li class="L3"><span class="pun">}</span></li><li class="L4"><span class="kwd">export</span><span class="pln">&nbsp;</span><span class="kwd">default</span><span class="pln">&nbsp;</span><span class="typ">Component</span></li></ol></pre></div></div></div>
</pre>
## Section - 12. Code Sharing and Reuse Between Services
### Lecture - 254. Updating the Common Module
<pre>
     <div><blockquote><h4><strong><em>Some useful npm commands:</em></strong></h4><ol><li><p><strong><em>npm version patch</em></strong><em> - It will update the version-number in package.json</em></p></li><li><p><strong><em>npm login </em></strong><em>-</em><strong><em> </em></strong><em>Logged in to npmjs account from CLI</em></p></li><li><p><strong><em>npm publish </em></strong>-<em> To take the required local files as a package to npmjs server</em></p></li><li><p><strong><em>npm update &lt;package-name&gt;</em></strong><em> - Update the local node package &lt;package-name&gt; with latest version available in npmjs </em></p></li></ol></blockquote></div>
</pre>
## Section - 14. NATS Streaming Server - An Event Bus Implementation
### Lecture - 286. Port-Forwarding with Kubectl
<pre>
     <div><p><strong>Kubernetes Pod port forwarding command</strong></p><p><em>kubectl port-forward &lt;pod-name&gt; &lt;port-to-access-in-local-machine&gt;:&lt;port-to-access-inside-pod&gt;</em></p></div>
</pre>
## Section - 14. NATS Streaming Server - An Event Bus Implementation
### Lecture - 293. Manual Ack Mode
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">NATS&nbsp;</span><span class="typ">Streaming</span><span class="pln">&nbsp;</span><span class="typ">Server</span><span class="pln">&nbsp;</span><span class="typ">Important</span><span class="pln">&nbsp;points</span><span class="pun">:</span></li><li class="L1"><span class="pun">--------------------------------------</span></li><li class="L2"><span class="lit">1.</span><span class="pln">&nbsp;</span><span class="typ">Publisher</span><span class="pln">&nbsp;publish&nbsp;the&nbsp;</span><span class="kwd">event</span><span class="pln">&nbsp;to&nbsp;NATS&nbsp;</span><span class="typ">Channel</span><span class="pln">&nbsp;</span><span class="typ">List</span></li><li class="L3"><span class="lit">2.</span><span class="pln">&nbsp;NATS&nbsp;streaming&nbsp;server&nbsp;sends&nbsp;the&nbsp;</span><span class="kwd">event</span><span class="pln">&nbsp;to&nbsp;those&nbsp;listeners&nbsp;who&nbsp;had&nbsp;subscribed&nbsp;to&nbsp;that&nbsp;channel&nbsp;instantly</span></li><li class="L4"><span class="lit">3.</span><span class="pln">&nbsp;</span><span class="typ">Queue</span><span class="pln">&nbsp;</span><span class="typ">Groups</span><span class="pln">&nbsp;</span><span class="pun">-</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">If</span><span class="pln">&nbsp;</span><span class="lit">2</span><span class="pln">&nbsp;subscriber&nbsp;are&nbsp;performing&nbsp;same&nbsp;operation</span><span class="pun">(</span><span class="kwd">as</span><span class="pln">&nbsp;they&nbsp;are&nbsp;replica</span><span class="pun">),</span><span class="pln">&nbsp;</span><span class="kwd">then</span><span class="pln">&nbsp;there&nbsp;will&nbsp;a&nbsp;chance&nbsp;to&nbsp;write&nbsp;data&nbsp;twice</span><span class="pun">.</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">To</span><span class="pln">&nbsp;overcome&nbsp;NATS&nbsp;introduces&nbsp;queue</span><span class="pun">-</span><span class="pln">groups&nbsp;mechanism</span><span class="pun">-</span></li><li class="L7"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">&gt;</span><span class="pln">&nbsp;</span><span class="kwd">const</span><span class="pln">&nbsp;subscription&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;stan</span><span class="pun">.</span><span class="pln">subscribe</span><span class="pun">(</span><span class="str">'&lt;channel-name&gt;'</span><span class="pun">,</span><span class="pln">&nbsp;</span><span class="str">'&lt;queue-group-name&gt;'</span><span class="pun">);</span></li><li class="L8"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;NATS&nbsp;will&nbsp;send&nbsp;only&nbsp;one&nbsp;member&nbsp;of&nbsp;the&nbsp;queue</span><span class="pun">-</span><span class="kwd">group</span><span class="pln">&nbsp;of&nbsp;the&nbsp;channel</span></li><li class="L9"><span class="pun">....................................</span></li><li class="L0"><span class="pun">..............</span></li></ol></pre></div></div></div>
</pre>
## Section - 14. NATS Streaming Server - An Event Bus Implementation
### Lecture - 295. Graceful Client Shutdown
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pun">...</span></li><li class="L1"><span class="lit">5.</span><span class="pln">&nbsp;</span><span class="typ">Client</span><span class="pln">&nbsp;</span><span class="typ">Health</span><span class="pln">&nbsp;</span><span class="typ">Check</span><span class="pln">&nbsp;</span><span class="pun">-</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">To</span><span class="pln">&nbsp;overcome&nbsp;waiting&nbsp;time&nbsp;</span><span class="kwd">in</span><span class="pln">&nbsp;</span><span class="typ">Manual</span><span class="pln">&nbsp;</span><span class="typ">Ack</span><span class="pln">&nbsp;</span><span class="typ">Mode</span><span class="pun">,</span><span class="pln">&nbsp;</span><span class="kwd">this</span><span class="pln">&nbsp;</span><span class="kwd">concept</span><span class="pln">&nbsp;has&nbsp;been&nbsp;introduced&nbsp;</span><span class="kwd">where</span><span class="pln">&nbsp;NATS&nbsp;</span><span class="kwd">is</span><span class="pln">&nbsp;checking&nbsp;the&nbsp;health&nbsp;status&nbsp;of&nbsp;the&nbsp;channel&nbsp;subscribers&nbsp;</span><span class="kwd">by</span><span class="pln">&nbsp;sending&nbsp;pings</span><span class="pun">(</span><span class="pln">heart&nbsp;beats&nbsp;signals</span><span class="pun">)</span><span class="pln">&nbsp;on&nbsp;an&nbsp;interval&nbsp;</span><span class="kwd">and</span><span class="pln">&nbsp;conclude&nbsp;the&nbsp;connection&nbsp;failure&nbsp;</span><span class="kwd">in</span><span class="pln">&nbsp;following&nbsp;failed&nbsp;heartbeat&nbsp;counts</span><span class="pun">.</span></li><li class="L3"><span class="lit">6.</span><span class="pln">&nbsp;</span><span class="typ">Graceful</span><span class="pln">&nbsp;</span><span class="typ">Client</span><span class="pln">&nbsp;</span><span class="typ">Shutdown</span></li><li class="L4"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">To</span><span class="pln">&nbsp;avoid&nbsp;</span><span class="typ">Heath</span><span class="pln">&nbsp;</span><span class="typ">Check</span><span class="pln">&nbsp;delay&nbsp;deceision&nbsp;making</span><span class="pun">,</span><span class="pln">&nbsp;the&nbsp;developer&nbsp;has&nbsp;to&nbsp;manually&nbsp;modify&nbsp;the&nbsp;subscriber&nbsp;code&nbsp;to&nbsp;explicitly&nbsp;close&nbsp;the&nbsp;subscriber&nbsp;connection</span><span class="pun">.</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;process</span><span class="pun">.</span><span class="pln">on</span><span class="pun">(</span><span class="str">'SIGINT'</span><span class="pun">,</span><span class="pln">&nbsp;</span><span class="pun">()</span><span class="pln">&nbsp;</span><span class="pun">=&gt;</span><span class="pln">&nbsp;stan</span><span class="pun">.</span><span class="pln">close</span><span class="pun">());</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;process</span><span class="pun">.</span><span class="pln">on</span><span class="pun">(</span><span class="str">'SIGTERM'</span><span class="pun">,</span><span class="pln">&nbsp;</span><span class="pun">()</span><span class="pln">&nbsp;</span><span class="pun">=&gt;</span><span class="pln">&nbsp;stan</span><span class="pun">.</span><span class="pln">close</span><span class="pun">());</span></li></ol></pre></div></div></div>
</pre>
## Section - 14. NATS Streaming Server - An Event Bus Implementation
### Lecture - 295. Graceful Client Shutdown
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pun">..</span></li><li class="L1"><span class="lit">4.</span><span class="pln">&nbsp;</span><span class="typ">Manual</span><span class="pln">&nbsp;</span><span class="typ">Ack</span><span class="pln">&nbsp;</span><span class="typ">Mode</span><span class="pun">-</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">While</span><span class="pln">&nbsp;sending&nbsp;</span><span class="kwd">event</span><span class="pln">&nbsp;</span><span class="kwd">by</span><span class="pln">&nbsp;NATS&nbsp;to&nbsp;the&nbsp;subscribers</span><span class="pun">,</span><span class="pln">subscribers&nbsp;bydefault&nbsp;automatically&nbsp;send&nbsp;a&nbsp;success&nbsp;acknowledgement&nbsp;to&nbsp;NATS&nbsp;without&nbsp;cross</span><span class="pun">-</span><span class="pln">verifing&nbsp;the&nbsp;success&nbsp;operation&nbsp;scenario&nbsp;</span><span class="kwd">in</span><span class="pln">&nbsp;subscriber&nbsp;side</span><span class="pun">.</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">To</span><span class="pln">&nbsp;deal&nbsp;</span><span class="kwd">with</span><span class="pln">&nbsp;</span><span class="kwd">this</span><span class="pln">&nbsp;the&nbsp;developer&nbsp;has&nbsp;to&nbsp;configure&nbsp;the&nbsp;subscriber&nbsp;</span><span class="kwd">not</span><span class="pln">&nbsp;to&nbsp;send&nbsp;acknowledgement&nbsp;automatically</span><span class="pun">.</span></li><li class="L4"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">Rather</span><span class="pln">&nbsp;sending&nbsp;it&nbsp;manually</span><span class="pun">.</span><span class="pln"> </span><span class="typ">Eg</span><span class="pun">:</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;subscription&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;stan</span><span class="pun">.</span><span class="pln">subscribe</span><span class="pun">(</span><span class="str">'&lt;channel-name&gt;'</span><span class="pun">,</span><span class="str">'&lt;queue-group-name&gt;'</span><span class="pun">,</span><span class="pln">&nbsp;stan</span><span class="pun">.</span><span class="pln">subscriptionOptions</span><span class="pun">().</span><span class="pln">setManualAckMode</span><span class="pun">(</span><span class="kwd">true</span><span class="pun">)</span><span class="pln">&nbsp;</span><span class="pun">);</span></li><li class="L6"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="typ">Merits</span><span class="pun">:</span></li><li class="L7"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="pun">*</span><span class="pln">&nbsp;</span><span class="typ">If</span><span class="pln">&nbsp;acknowledgement&nbsp;fails</span><span class="pun">,</span><span class="pln">NATS&nbsp;will&nbsp;resend&nbsp;the&nbsp;</span><span class="kwd">event</span><span class="pln">&nbsp;to&nbsp;the&nbsp;queue</span><span class="pun">-</span><span class="kwd">group</span><span class="pln">&nbsp;of&nbsp;the&nbsp;channel&nbsp;again&nbsp;after&nbsp;ack_waiting&nbsp;time</span><span class="pun">(</span><span class="pln">bydefault&nbsp;</span><span class="lit">30sec</span><span class="pun">)...</span></li></ol></pre></div></div></div>
</pre>
## Section - 14. NATS Streaming Server - An Event Bus Implementation
### Lecture - 296. Core Concurrency Issues
<pre>
     <div><p><strong>Core Concurrency Issues</strong></p><ol><li><p>Listener can fail to process the event</p></li><li><p>One listener might run more quickly than another</p></li><li><p>NATS might think a client is still alive when it is dead. It will wait up-to ack_wait interval</p></li><li><p>There might be a case of receiving the same event twice</p></li></ol><p><strong>How to overcome</strong></p><p>1. One possible solution, the publisher should track the NATS last processed event id on the particular resource id. And the listener will compare the last processed id and current incoming id on the particular resource id for taking a decision to process.</p></div>
</pre>
## Section - 19. Listening for Events and Handling Concurrency Issues
### Lecture - 389. Who Updates Versions?
<pre>
     <div><blockquote><p>When should increment/include the version number of a record with an event?</p><ol><li><p>When the <em>primary service responsible for a record </em>emits an event to describe a <em>create/update/destroy </em>to a record(basically on each write operation)</p></li></ol></blockquote></div>
</pre>
## Section - 21. Handling Payments
### Lecture - 455. Creating a Stripe Secret
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="com">##&nbsp;Kubernetes&nbsp;**Secret&nbsp;Service**&nbsp;commands&nbsp;need&nbsp;to&nbsp;run&nbsp;manually&nbsp;in&nbsp;dev&nbsp;but&nbsp;required&nbsp;a&nbsp;config&nbsp;file&nbsp;for&nbsp;prod&nbsp;deployment&nbsp;**_[Required&nbsp;research]_**</span></li><li class="L1"><span class="pln">&nbsp;</span></li><li class="L2"><span class="pun">&gt;</span><span class="pln">&nbsp;kubectl&nbsp;create&nbsp;secret&nbsp;</span><span class="kwd">generic</span><span class="pln">&nbsp;stripe</span><span class="pun">-</span><span class="pln">secret&nbsp;</span><span class="pun">--</span><span class="kwd">from</span><span class="pun">-</span><span class="pln">literal&nbsp;STRIPE_KEY</span><span class="pun">=&lt;</span><span class="pln">refer</span><span class="pun">-</span><span class="pln">stripe</span><span class="pun">-</span><span class="pln">account</span><span class="pun">&gt;</span></li><li class="L3"><span class="pln">&nbsp;</span></li><li class="L4"><span class="com">##&nbsp;How&nbsp;to&nbsp;get&nbsp;secrets</span></li><li class="L5"><span class="pun">&gt;</span><span class="pln">&nbsp;kubectl&nbsp;</span><span class="kwd">get</span><span class="pln">&nbsp;secrets</span></li></ol></pre></div></div></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 517. Why Use Docker?
<pre>
     <div><p><strong>Why we use Docker?</strong></p><p>Docker makes easy to install ans run software without worrying about setup or dependencies.</p></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 518. What is Docker?
<pre>
     <div><p><strong>Docker Image: </strong>A single file with all dependencies and configuration required to run a program.</p><p><strong>Docker Container: </strong>Instance of an image. Runs a program</p></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 518. What is Docker?
<pre>
     <div><p><strong>What is docker?</strong></p><p>Docker is a platform/ecosystem in which containers are being created, run and managed.</p><p><strong>What are Docker Ecosystem?</strong></p><ul><li><p>Docker Client</p></li><li><p>Docker Server</p></li><li><p>Docker Machine</p></li><li><p>Docker Image</p></li><li><p>Docker Hub</p></li><li><p>Docker Compose</p></li></ul></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 519. Docker for Mac / Windows
<pre>
     <div><p><strong>Docker Client<em>(Docker CLI)</em>: </strong>Its a tool that used to pass commands to docker server.</p><p><strong>Docker Server<em>(Docker Daemon)</em>: </strong>Its a tool that is responsible for creating images, run containers, etc. </p><p><code>Docker Server can run only on linux machine as namespacing and cgroups are possible on linux OS.</code></p><p><br></p></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 527. But Really... What's a Container?
<pre>
     <div><p><strong>What is a Namespacing?</strong></p><p>Its a way to isolate resources per process(or group of processes).</p><p>Resources Like - </p><ul><li><p>Hard Drive</p></li><li><p>Network</p></li><li><p>Users</p></li><li><p>Host-name</p></li><li><p>Inter Process Communication</p></li></ul><p><strong>What are Control Groups<em>(cgroups)?</em></strong></p><p>It is way to limit the amount of resources used per process.</p><p>Here the resources like -</p><ul><li><p>Memory</p></li><li><p>CPU Usage</p></li><li><p>Hard Drive I/O</p></li><li><p>Network Bandwidth</p></li></ul></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 527. But Really... What's a Container?
<pre>
     <div><p><strong>Kernel: </strong>Kernel is a running software process that governs access between all the programs that are running on the computer and all the physical hardware connected to the computer. All the programs interact with the kernel through the system calls to use physical devices.</p></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 531. Listing Running Containers
<pre>
     <div><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">docker&nbsp;run&nbsp;</span><span class="pun">&lt;</span><span class="pln">image</span><span class="pun">-</span><span class="pln">name</span><span class="pun">&gt;</span><span class="pln">&nbsp;</span><span class="pun">&lt;</span><span class="pln">custom</span><span class="pun">-</span><span class="pln">command</span><span class="pun">[</span><span class="pln">&nbsp;optional&nbsp;</span><span class="pun">]&gt;:</span><span class="pln">&nbsp;</span><span class="typ">Run</span><span class="pln">&nbsp;a&nbsp;container&nbsp;of&nbsp;image&nbsp;</span><span class="pun">&lt;</span><span class="pln">image</span><span class="pun">-</span><span class="pln">name</span><span class="pun">&gt;</span><span class="pln">&nbsp;</span><span class="kwd">with</span><span class="pln">&nbsp;</span><span class="pun">&lt;</span><span class="pln">custom</span><span class="pun">-</span><span class="pln">command</span><span class="pun">&gt;</span><span class="pln">&nbsp;</span><span class="kwd">if</span><span class="pln">&nbsp;available</span></li><li class="L1"><span class="pln">docker&nbsp;ps</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">List</span><span class="pln">&nbsp;of&nbsp;containers&nbsp;which&nbsp;are&nbsp;currently&nbsp;</span><span class="kwd">in</span><span class="pln">&nbsp;RUNNING&nbsp;status</span></li><li class="L2"><span class="pln">docker&nbsp;ps&nbsp;</span><span class="pun">--</span><span class="pln">all</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">List</span><span class="pln">&nbsp;of&nbsp;containers</span></li></ol></pre></div></div></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 535. Retrieving Output Logs
<pre>
     <div><ol><li><p>docker system prune</p></li><li><p>docker stop &lt;conatiner-name | container-id&gt;: Send SIGTERM signal to kernel</p></li><li><p>docker kill &lt;conatiner-name | container-id&gt;: Send SIGKILL signal to kernel</p></li><li><p>docker exec -it &lt;conatiner-name | container-id&gt; &lt;custom-cmd&gt;:</p><ol><li><p>-i, --interactive&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Keep STDIN open even if not attached</p><p>&nbsp; &nbsp; &nbsp; --privileged&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Give extended privileges to the command</p><p>&nbsp; -t, --tty&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Allocate a pseudo-TTY</p></li></ol></li></ol></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 553. Manual Image Generation with Docker Commit
<pre>
     <div><p>1. docker create -c 'CMD ["executableFile"]' &lt;container-id | conatiner-name&gt;: Use to create image manually from running container.</p></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 562. Container Port Forwarding
<pre>
     <div><p><strong>Port Mapping: </strong><code>docker run -p &lt;port-on-the-system&gt;:&lt;port-on-the-container&gt; &lt;image-name | image-id&gt;</code> </p></div>
</pre>
## Section - 24. [Appendix A] - Basics of Docker
### Lecture - 565. Minimizing Cache Busting and Rebuilds
<pre>
     <div><p><strong>Minimizing Cache Busting and Rebuild:</strong></p><ol><li><p>....</p></li><li><p>COPY ./package.json ./</p></li><li><p>npm install</p></li><li><p>COPY ./ ./</p></li><li><p>......</p></li></ol></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 567. TypeScript Overview
<pre>
     <div><p><strong>TypeScript</strong></p><ul><li><p>It uses type annotations to analyze the code and catch errors during development.</p></li><li><p>It doesn't provide any performance optimization.</p></li></ul></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 567. TypeScript Overview
<pre>
     <div><p><strong>TypeScript Code [JavaScript + type-annotation]</strong></p><p><strong> |</strong></p><p><strong> |</strong></p><p><strong>V</strong></p><p><strong>Typescript compiler</strong></p><p><strong> |</strong></p><p><strong> |</strong></p><p><strong>V</strong></p><p><strong>Plain old JavaScript [Run by JS and Nodejs engine]</strong></p></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 579. Type Annotations and Inference
<pre>
     <div><p><strong>Type Annotations:</strong></p><p>These are piece of codes which tells about the type to typescript compiler. </p><p><strong>Type Inference</strong>:</p><p>Type Inference refers to the inferences made by typescript compiler regarding what type of value a variable refers to.</p></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 584. The Any Type
<pre>
     <div><p><strong>Any type:</strong></p><p>Any type is a type annotation in which TS has no idea about the type of the variable. Avoid variables with type 'any'.</p></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 598. Tuples in TypeScript
<pre>
     <div><p><strong>Interfaces:</strong></p><p> Eg.&nbsp; </p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="kwd">interface</span><span class="pln">&nbsp;</span><span class="typ">Drink</span><span class="pln">&nbsp;</span><span class="pun">{</span></li><li class="L1"><span class="pln">&nbsp;&nbsp;name</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="kwd">string</span><span class="pun">;</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;cost</span><span class="pun">:</span><span class="pln">&nbsp;number</span><span class="pun">;</span><span class="pln">&nbsp;</span></li><li class="L3"><span class="pun">};</span></li><li class="L4"><span class="kwd">const</span><span class="pln"> pepsi</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Drink</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="pun">{};</span><span class="pln"> </span><span class="com">// Error </span></li></ol></pre></div></div><p><strong>type alias:</strong></p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="pln">type&nbsp;</span><span class="typ">Drink</span><span class="pln">&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;</span><span class="pun">[</span><span class="pln">&nbsp;</span><span class="kwd">string</span><span class="pun">,</span><span class="pln">&nbsp;number&nbsp;</span><span class="pun">];</span></li><li class="L1"><span class="pln">&nbsp;</span></li><li class="L2"><span class="kwd">const</span><span class="pln">&nbsp;pepsi</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="typ">Drink</span><span class="pln">&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;</span><span class="pun">[</span><span class="pln">&nbsp;</span><span class="str">'ppp'</span><span class="pun">,</span><span class="pln">&nbsp;</span><span class="lit">10</span><span class="pln">&nbsp;</span><span class="pun">];</span><span class="pln">&nbsp;</span><span class="com">//&nbsp;ok</span></li></ol></pre></div></div></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 599. Tuples in Action
<pre>
     <div><p><strong>Tuples:</strong> 
It is an array-like structure where each element represents some property of a record.</p></div>
</pre>
## Section - 25. [Appendix B] - Basics of Typescript
### Lecture - 612. Fields with Inheritance
<pre>
     <div><p><strong>Class Template with parameterized constructor:</strong></p><div class="ud-component--base-components--code-block"><div><pre class="prettyprint linenums prettyprinted" role="presentation" style=""><ol class="linenums"><li class="L0"><span class="kwd">class</span><span class="pln">&nbsp;</span><span class="typ">Vehicle</span><span class="pln">&nbsp;</span><span class="pun">{</span></li><li class="L1"><span class="pln">&nbsp;&nbsp;</span><span class="kwd">public</span><span class="pln">&nbsp;color</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="kwd">string</span><span class="pun">;</span></li><li class="L2"><span class="pln">&nbsp;&nbsp;</span></li><li class="L3"><span class="pln">&nbsp;&nbsp;constructor</span><span class="pun">(</span><span class="pln">color</span><span class="pun">:</span><span class="pln">&nbsp;</span><span class="kwd">string</span><span class="pun">)</span><span class="pln">&nbsp;</span><span class="pun">{</span></li><li class="L4"><span class="pln">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="kwd">this</span><span class="pun">.</span><span class="pln">color&nbsp;</span><span class="pun">=</span><span class="pln">&nbsp;color</span><span class="pun">;</span></li><li class="L5"><span class="pln">&nbsp;&nbsp;</span><span class="pun">}</span></li><li class="L6"><span class="pun">};</span></li><li class="L7"><span class="com">// Can also be written as</span></li><li class="L8"><span class="kwd">class</span><span class="pln"> </span><span class="typ">Vehicle</span><span class="pln"> </span><span class="pun">{</span><span class="pln">  </span></li><li class="L9"><span class="pln">  constructor</span><span class="pun">(</span><span class="kwd">public</span><span class="pln"> color</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">string</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{}</span></li><li class="L0"><span class="pun">};</span></li></ol></pre></div></div></div>
</pre>
