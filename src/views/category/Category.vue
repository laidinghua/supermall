<template>
  <div class="wrapper" ref="aaaa">
    <ul class="content">
      <li>l列表1</li>
      <li>l列表2</li>
      <li>l列表3</li>
      <li>l列表4</li>
      <li>l列表5</li>
      <li>l列表6</li>
      <li>l列表7</li>
      <li>l列表8</li>
      <li>l列表9</li>
      <li>l列表10</li>
      <li>l列表11</li>
      <li>l列表12</li>
      <li>l列表13</li>
      <li>l列表14</li>
      <li>l列表15</li>
      <li>l列表16</li>
      <li>l列表17</li>
      <li>l列表18</li>
      <li>l列表19</li>
      <li>l列表20</li>
      <li>l列表21</li>
      <li>l列表22</li>
      <li>l列表23</li>
      <li>l列表24</li>
      <li>l列表25</li>
      <li>l列表26</li>
      <li>l列表27</li>
      <li>l列表28</li>
      <li>l列表29</li>
      <li>l列表30</li>
      <li>l列表31</li>
      <li>l列表32</li>
      <li>l列表33</li>
      <li>l列表34</li>
      <li>l列表35</li>
      <li>l列表36</li>
      <li>l列表37</li>
      <li>l列表38</li>
      <li>l列表39</li>
      <li>l列表40</li>
      <li>l列表41</li>
      <li>l列表42</li>
      <li>l列表43</li>
      <li>l列表44</li>
      <li>l列表45</li>
      <li>l列表46</li>
      <li>l列表47</li>
      <li>l列表48</li>
      <li>l列表49</li>
      <li>l列表50</li>
      <li>l列表51</li>
      <li>l列表52</li>
      <li>l列表53</li>
      <li>l列表54</li>
      <li>l列表55</li>
      <li>l列表56</li>
      <li>l列表57</li>
      <li>l列表58</li>
      <li>l列表59</li>
      <li>l列表60</li>
      <li>l列表61</li>
      <li>l列表62</li>
      <li>l列表63</li>
      <li>l列表64</li>
      <li>l列表65</li>
      <li>l列表66</li>
      <li>l列表67</li>
      <li>l列表68</li>
      <li>l列表69</li>
      <li>l列表70</li>
      <li>l列表71</li>
      <li>l列表72</li>
      <li>l列表73</li>
      <li>l列表74</li>
      <li>l列表75</li>
      <li>l列表76</li>
      <li>l列表77</li>
      <li>l列表78</li>
      <li>l列表79</li>
      <li>l列表80</li>
      <li>l列表81</li>
      <li>l列表82</li>
      <li>l列表83</li>
      <li>l列表84</li>
      <li>l列表85</li>
      <li>l列表86</li>
      <li>l列表87</li>
      <li>l列表88</li>
      <li>l列表89</li>
      <li>l列表90</li>
      <li>l列表91</li>
      <li>l列表92</li>
      <li>l列表93</li>
      <li>l列表94</li>
      <li>l列表95</li>
      <li>l列表96</li>
      <li>l列表97</li>
      <li>l列表98</li>
      <li>l列表99</li>
      <li>l列表100</li>
    </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
		name: "Category",
    data(){
		  return{
		    scroll:null
      }
    },
    mounted() {
      this.scroll=new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position)=>{
        console.log(position);
      })
      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多');
      })
    },
  }
</script>

<style scoped>
  /*#category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }*/
  .wrapper{
    height: 150px;
    background-color: #ff5777;

    overflow: hidden;
  }
</style>
