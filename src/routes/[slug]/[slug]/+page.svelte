<script lang="ts">
	export let data;
	import BiggerPicture from 'bigger-picture/svelte';
	import '@splidejs/svelte-splide/css';
	import 'bigger-picture/css';
	import { onMount } from 'svelte';
	import Slider from '$lib/app/ImageSlider/Slider.svelte';

	// initialize BiggerPicture

	onMount(() => {
		const bp = BiggerPicture({
			target: document.body
		});
		// grab image links
		const imageLinks = document.querySelectorAll('#images .image');

		// add click listener to open BiggerPicture
		for (let link of imageLinks) {
			link.addEventListener('click', openGallery);
		}

		// open BiggerPicture
		function openGallery(e: Event) {
			e.preventDefault();
			bp.open({
				items: imageLinks,
				el: e.currentTarget as HTMLElement
			});
		}
	});

	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<section>
	<div class="container flex gap small">
		{#if width > 900}
			<div class="images" id="images">
				{#each data.product.images as image}
					<div
						class="image"
						data-img={image.url}
						data-thumb={image.formats.medium?.url}
						data-height={image.height}
						data-width={image.width}
						data-alt={image.alternativeText}
						data-sveltekit-preload-data="tap"
					>
						<img src={image.formats.medium?.url || image.url} alt="" />
					</div>
				{/each}
			</div>
		{:else}
			<Slider images={data.product.images} />
		{/if}

		<div class="text">
			<h1>{data.product.title}</h1>
			<a href="/{data.product.category.slug}">{data.product.category.slug}</a>
			<p>{@html data.product.description}</p>
		</div>
	</div>
</section>

<style>
	a {
		color: var(--primary-color);
		display: block;
		margin-top: var(--size-s);
		margin-bottom: var(--size-m);
		font-weight: 400;
		letter-spacing: 0.1rem;
		transition: letter-spacing 0.2s ease;
		font-size: var(--size-s);
	}
	a:hover {
		letter-spacing: 0.05rem;
	}
	.images,
	.text {
		width: 50%;
	}

	h1 {
		font-size: clamp(1.5rem, 4.5vw, 2.5rem);
	}
	.container {
		padding-top: var(--size-l);
		padding-bottom: var(--size-l);
		height: 100%;
	}
	.images {
		display: grid;
		gap: var(--size-s);
		grid-template-columns: 1fr 1fr;
	}
	img {
		border-radius: var(--size-s);
		max-height: 500px;
		object-fit: cover;
	}

	.images div:first-of-type,
	.images div:nth-of-type(4n) {
		grid-column: span 2;
	}

	@media only screen and (max-width: 900px) {
		.flex {
			flex-direction: column;
		}
		.images,
		.text {
			width: 100%;
		}
	}
</style>
