<script>
    import "../app.css";
    import BackgroundPattern from "../assets/pattern.jpg";
</script>

<div class="min-h-screen bg-gradient-to-tr from-indigo-400 to-purple-300 flex justify-center items-center">
    <img src={BackgroundPattern} alt="&nbsp;" class="fixed top-0 left-0 w-screen h-screen object-cover opacity-70">
    <slot />
</div>
