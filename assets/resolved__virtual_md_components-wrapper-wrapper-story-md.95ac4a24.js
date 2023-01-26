const html = '<p>Vue applications usually use at least a few third-party libraries and components.<br>\nLet\u2019s take the vue-multiselect package as an example. Applications with a lot of forms could use a select component in quite a few places. In the code snippet below, we have simple usage of the vue-multiselect component.</p>\n<pre><code class="language-vue"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">vue</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">&lt;</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">  &lt;</span><span style="color: #7EE787">vue-multiselect</span></span>\n<span class="line"><span style="color: #C9D1D9">    </span><span style="color: #79C0FF">v-model</span><span style="color: #C9D1D9">=</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9">value</span><span style="color: #C9D1D9">&quot;</span></span>\n<span class="line"><span style="color: #C9D1D9">    :</span><span style="color: #79C0FF">options</span><span style="color: #C9D1D9">=</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9">options</span><span style="color: #C9D1D9">&quot;</span></span>\n<span class="line"><span style="color: #C9D1D9">    </span><span style="color: #79C0FF">searchable</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">label</span><span style="color: #C9D1D9">=</span><span style="color: #A5D6FF">&quot;name&quot;</span><span style="color: #C9D1D9">/&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">&lt;/</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"></span></code></pre></div></code></pre>\n<p>Though it works, but what happens if you need to move away from vue-multiselect to a different library? There could be several reasons, such as lack of maintenance, licensing changes, lack of specific features, or maybe you want to switch to the next version of Vue, but the library will not provide a compatible version any time soon. If you have used the <vue-multiselect/> component directly, every single file using it will need to be changed. That\u2019s where wrapper components come into play. We create a wrapper component around them and pass through all the props, events, and slots.</p>\n<p><code>src/components/wrapper/Select.vue</code></p>\n<pre><code class="language-vue"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">vue</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">&lt;</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">  &lt;</span><span style="color: #7EE787">vue-multiselect</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">    </span><span style="color: #8B949E">&lt;!-- Pass on all slots --&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">    &lt;</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">v-for</span><span style="color: #C9D1D9">=</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9">name </span><span style="color: #FF7B72">of</span><span style="color: #C9D1D9"> Object.</span><span style="color: #D2A8FF">keys</span><span style="color: #C9D1D9">($slots)</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9"> #[</span><span style="color: #79C0FF">name</span><span style="color: #C9D1D9">]=</span><span style="color: #A5D6FF">&quot;scope&quot;</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">      &lt;</span><span style="color: #7EE787">slot</span><span style="color: #C9D1D9"> :</span><span style="color: #79C0FF">name</span><span style="color: #C9D1D9">=</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9">name</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">v-bind</span><span style="color: #C9D1D9">=</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9">scope</span><span style="color: #C9D1D9">&quot;</span><span style="color: #C9D1D9"> /&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">    &lt;/</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">  &lt;/</span><span style="color: #7EE787">vue-multiselect</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"><span style="color: #C9D1D9">&lt;/</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>\n<span class="line"></span></code></pre></div></code></pre>\n<p><em><strong>Credits: Vue The Road to Enterprise</strong></em></p>\n';
const frontmatter = {};
const relativePath = "components\\wrapper\\wrapper.story.md";
export {
  frontmatter,
  html,
  relativePath
};