<template>
  <div class="external-links-container">
    <h4 class="section-title">External Links</h4>
    <div class="links-grid">
      <div v-if="links.imdb_id && (currentPageType === 'movie' || currentPageType === 'tv')" class="link-item">
        <a
          :href="stremioLink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch on Stremio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 192 192"
            fill="currentColor"
            class="link-icon stremio-icon"
          >
            <path d="M100.242 23.743a6 6 0 0 0-8.485 0L23.743 91.757a6 6 0 0 0 0 8.485l68.014 68.015a6 6 0 0 0 8.485 0l68.015-68.015a6 6 0 0 0 0-8.485l-68.015-68.014ZM80 71.83c0-2.44 2.758-3.86 4.744-2.442l33.838 24.17a3 3 0 0 1 0 4.883l-33.838 24.171C82.758 124.03 80 122.611 80 120.17V71.83Z"/>
          </svg>
          <span class="label-style">Watch on Stremio</span>
        </a>
      </div>

      <div v-if="links.imdb_id" class="link-item">
        <a
          :href="`https://www.imdb.com/${imdb}/${links.imdb_id}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit IMDb"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="link-icon"
          >
            <path
              d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.885v-2.866c0-.33-.004-.54-.033-.63a.292.292 0 0 0-.14-.204z"
            />
            <path
              d="M22.416 0H1.62C.742.06.06.744 0 1.596V22.38c.06.874.712 1.542 1.555 1.617.015.003.03.003.045.003h20.845A1.727 1.727 0 0 0 24 22.29V1.71C24 .82 23.305.07 22.416 0zM4.792 15.626H2.887V8.26h1.905v7.366zm6.54-.002H9.67v-4.97L9 15.623H7.812l-.698-4.86-.007 4.86H5.44V8.26h2.468c.083.523.16 1.048.23 1.574l.27 1.87.442-3.444h2.483v7.364zm4.977-2.18c0 .655-.044 1.094-.104 1.32-.062.22-.17.4-.326.52-.15.13-.34.218-.57.266-.223.045-.57.075-1.02.075l-.004-.002H11.98V8.26h1.426c.914 0 1.45.047 1.77.128.325.09.575.225.745.42.165.18.273.404.313.645.05.235.076.705.076 1.402v2.588zm4.944.475c0 .45-.045.764-.09.99-.06.224-.195.404-.405.568-.226.166-.48.24-.78.24-.22 0-.5-.06-.68-.136a1.586 1.586 0 0 1-.515-.427l-.116.47H16.95V8.26l-.02-.003h1.8v2.4c.15-.175.315-.31.51-.4.196-.083.466-.127.69-.127.226-.003.45.036.66.115.17.07.32.185.436.33.09.125.15.27.18.42.03.138.044.43.044.87v2.054z"
            />
            <path
              d="M19.08 11.205c-.12 0-.194.04-.225.12-.03.08-.06.29-.06.624v1.946c0 .324.03.533.06.623.04.086.13.14.226.134.12 0 .272-.047.3-.14.03-.097.046-.32.046-.674l.03-.002v-1.89c0-.303-.015-.508-.060-.603-.044-.1-.195-.14-.315-.14z"
            />
          </svg>
          <span class="label-style">IMDb</span>
        </a>
      </div>

      <div
        v-if="links.imdb_id && currentPageType === 'movie'"
        class="link-item"
      >
        <a
          :href="`https://letterboxd.com/imdb/${links.imdb_id}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Letterboxd"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 448 512"
            fill="currentColor"
            class="link-icon"
          >
            <path
              d="M384 32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384zM105.1 187C66.4 187 35 218.3 35 257s31.4 70 70.1 70c24.8 0 46.5-12.8 59-32.2l.5-.7-.4-.6c-6.5-10.6-10.2-23.1-10.2-36.5c0-13.6 3.9-26.3 10.6-37.1c-12.4-19.8-34.4-32.9-59.5-32.9zM224 187c-24.8 0-46.5 12.8-59 32.2l-.5 .7 .4 .6c6.5 10.6 10.2 23.1 10.2 36.5c0 13.6-3.9 26.3-10.6 37.1C176.9 313.8 198.9 327 224 327c24.8 0 46.5-12.8 59-32.2l.5-.7-.4-.6c-6.5-10.6-10.2-23.1-10.2-36.5c0-13.6 3.9-26.3 10.6-37.1C271.1 200.2 249.1 187 224 187zm118.9 0c-24.8 0-46.5 12.8-59 32.2l-.5 .7 .4 .6c6.5 10.6 10.2 23.1 10.2 36.5c0 13.6-3.9 26.3-10.6 37.1c12.4 19.8 34.4 32.9 59.5 32.9c38.7 0 70.1-31.3 70.1-70s-31.4-70-70.1-70z"
            />
          </svg>
          <span class="label-style">Letterboxd</span>
        </a>
      </div>

      <div v-if="links.imdb_id" class="link-item">
        <a
          :href="`https://trakt.tv/search/imdb?query=${links.imdb_id}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Trakt"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            class="link-icon"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16 32c-8.817 0-16-7.183-16-16s7.183-16 16-16c8.817 0 16 7.183 16 16s-7.183 16-16 16zM16 1.615c-7.932 0-14.385 6.453-14.385 14.385s6.453 14.385 14.385 14.385c7.932 0 14.385-6.453 14.385-14.385s-6.453-14.385-14.385-14.385zM6.521 24.708c2.339 2.557 5.724 4.152 9.479 4.152 1.917 0 3.735-0.417 5.369-1.167l-8.932-8.907zM25.573 24.62c2.052-2.281 3.307-5.323 3.307-8.625 0-5.177-3.047-9.62-7.421-11.677l-8.12 8.099 12.219 12.204zM12.401 13.38l-6.765 6.74-0.907-0.907 15.421-15.416c-1.301-0.437-2.692-0.677-4.151-0.677-7.115-0.005-12.885 5.765-12.885 12.88 0 2.896 0.953 5.573 2.588 7.735l6.74-6.74 0.479 0.437 9.663 9.661c0.197-0.109 0.38-0.219 0.556-0.353l-10.703-10.672-6.468 6.473-0.907-0.905 7.38-7.381 0.479 0.443 11.281 11.251c0.177-0.136 0.339-0.292 0.5-0.421l-12.181-12.157-0.109 0.021zM16.464 14.749l-0.901-0.9 6.38-6.385 0.907 0.916-6.385 6.38zM22.521 5.979l-7.36 7.36-0.907-0.907 7.36-7.359 0.907 0.911z"
              />
            </g>
          </svg>
          <span class="label-style">Trakt</span>
        </a>
      </div>
      
      <div v-if="links.twitter_id" class="link-item">
        <a
          :href="`https://twitter.com/${links.twitter_id}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="link-icon"
          >
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            />
          </svg>
          <span class="label-style">Twitter</span>
        </a>
      </div>
      <div v-if="links.instagram_id" class="link-item">
        <a
          :href="`https://instagram.com/${links.instagram_id}`"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="link-icon"
          >
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
          <span class="label-style">Instagram</span>
        </a>
      </div>
  
      <div v-if="links.homepage" class="link-item">
        <a
          :href="links.homepage"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Official Website"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="link-icon"
        >
        <path
          d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"
        />
          </svg>
          <span class="label-style">Official Website</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: String,
      required: false,
      default: "",
    },
    links: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currentPageType() {
      const currentPath = window.location.pathname;
      if (currentPath.includes("/movie/")) {
        return "movie";
      } else if (currentPath.includes("/tv/")) {
        return "tv";
      }
      return "";
    },
    imdb() {
      return this.media === "person" ? "name" : "title";
    },
    stremioLink() {
      const contentType = this.currentPageType === "tv" ? "series" : "movie";
      return `stremio://detail/${contentType}/${this.links.imdb_id}`;
    },
  },
};
</script>

<style scoped>
.external-links-container {
  margin: 16px 0;
  width: 100%;
  max-width: 580px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.link-item {
  width: 100%;
}

.link-item a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px 12px;
  background-color: rgba(255, 255, 255, 0.027);
  border-radius: 8px;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-sizing: border-box;
  height: 100%;
}

.link-item a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.link-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.link-item a:hover .link-icon {
  transform: scale(1.1);
}

.label-style {
  font-size: 14px;
  padding-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .links-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .label-style {
    font-size: 12px;
  }
}

.stremio-icon {
  width: 28px !important;
  height: 28px !important;
}
</style>