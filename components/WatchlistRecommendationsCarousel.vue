<template>
    <div class="listing listing--carousel">
      <div
        v-if="title"
        class="listing__head">
        <h2
          class="listing__title">
          {{ title }}
        </h2>
        <span 
          v-if="!loading && recommendations.length > 0"
          class="listing__explore"
          @click="refreshRecommendations"
          :class="{ 'disabled': refreshing }">
          {{ refreshing ? 'Actualizando...' : (generatedTime || 'Actualizar') }}
        </span>
      </div>
  
      <div v-if="loading" class="recommendations-loading">
        <div class="loading-message">
          <div class="loading-indicator">
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
          </div>
          <p>{{ loadingMessage }}</p>
        </div>
      </div>
  
      <div v-else-if="error" class="recommendations-error">
        <div class="error-message">{{ error }}</div>
      </div>
  
      <div v-else-if="recommendations.length === 0 && !loading" class="empty-recommendations">
        <div class="empty-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 21l-1.42-1.34C5.4 15.34 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.84-8.58 11.16L12 21z" />
          </svg>
          <p>Add more items to your watchlist to get personalized recommendations</p>
        </div>
      </div>
  
      <div v-else class="carousel">
        <button
          class="carousel__nav carousel__nav--left"
          aria-label="Previous"
          type="button"
          :disabled="disableLeftButton"
          @click="moveToClickEvent('left')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"/></svg>
        </button>
  
        <div
          ref="carouselElement"
          class="carousel__items"
          @scroll="scrollEvent">
          <div 
            v-for="(recommendation, index) in recommendations" 
            :key="`recommendation-${index}`" 
            class="card"
          >
            <nuxt-link 
              :to="{ name: `${recommendation.type}-id`, params: { id: recommendation.id } }" 
              class="card__link"
            >
              <div class="card__img">
                <img 
                  :src="getImageUrl(recommendation.poster_path)" 
                  :alt="recommendation.title"
                  @error="handleImageError($event)"
                >
                
                <div class="association-badge" @click.prevent.stop="toggleAssociationDetails(index)">
                  <span>?</span>
                </div>
              </div>
              
              <h2 class="card__name">
                {{ recommendation.title }}
              </h2>
              
              <div class="card__rating">
                <div class="card__stars">
                  <div :style="{ width: `${calculateStarsWidth(recommendation.vote_average)}%` }"></div>
                </div>
                <div class="card__vote" v-if="recommendation.vote_average">
                  {{ formatRating(recommendation.vote_average) }}
                </div>
              </div>
            </nuxt-link>
            
            <div 
              v-if="activeAssociationIndex === index" 
              class="association-details"
            >
              <div class="association-content">
                <button class="close-button" @click="toggleAssociationDetails(index)">×</button>
                <h4>Why we recommend this:</h4>
                <p>{{ recommendation.association_reason }}</p>
                <div class="based-on">
                  <span>Based on:</span>
                  <div class="watchlist-items">
                    <span v-for="(item, itemIndex) in recommendation.based_on" :key="itemIndex">
                      {{ item }}{{ itemIndex < recommendation.based_on.length - 1 ? ',' : '' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <button
          class="carousel__nav carousel__nav--right"
          aria-label="Next"
          type="button"
          :disabled="disableRightButton"
          @click="moveToClickEvent('right')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"/></svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import carousel from '~/mixins/Carousel';
  import axios from 'axios';
  
  export default {
    name: 'WatchlistRecommendationsCarousel',
    
    mixins: [carousel],
    
    props: {
      title: {
        type: String,
        default: 'Based on Your Watchlist'
      }
    },
    
    data() {
      return {
        recommendations: [],
        loading: true,
        refreshing: false,
        error: null,
        activeAssociationIndex: null,
        userEmail: '',
        fallbackImageUrl: "https://github.com/imprvhub/entercinema/blob/main/static/image_not_found_yet.png?raw=true",
        cachedResults: false,
        generatedAt: null,
        loadingMessage: "Analyzing your watchlist to find personalized recommendations..."
      };
    },
    
    computed: {
      generatedTime() {
        if (!this.generatedAt) return null;
        
        try {
          const date = new Date(this.generatedAt);
          const now = new Date();
          const diffMs = now - date;
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          
          if (diffDays === 0) {
            return "Actualizar";
          } else if (diffDays === 1) {
            return "Actualizar";
          } else {
            return "Actualizar";
          }
        } catch (error) {
          console.error("Error formatting date:", error);
          return "Actualizar";
        }
      }
    },
    
    async mounted() {
      try {
        const email = localStorage.getItem('email');
        const accessToken = localStorage.getItem('access_token');
        
        if (email && accessToken) {
          this.userEmail = email;
          await this.getRecommendations();
        } else {
          this.loading = false;
          this.error = "Please sign in to see personalized recommendations";
        }
      } catch (error) {
        console.error('Error in component initialization:', error);
        this.loading = false;
        this.error = "An error occurred while initializing the recommendations";
      }
    },
    
    watch: {
      recommendations(newValue) {
        if (newValue.length > 0) {
          this.$nextTick(() => {
            if (this.$refs.carouselElement) {
              this.calculateState(newValue.length);
            }
          });
        }
      }
    },
    
    methods: {
      async getRecommendations(forceRefresh = false) {
        try {
          this.loading = true;
          this.error = null;
          
          if (forceRefresh) {
            this.loadingMessage = "Regenerando recomendaciones basadas en tu watchlist...";
            this.refreshing = true;
          } else {
            this.loadingMessage = "Analizando tu watchlist para encontrar recomendaciones personalizadas...";
          }
  
          const apiBaseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:8000'
            : '/api';
          
          const response = await axios.post(`${apiBaseUrl}/recommendations`, {
            user_email: this.userEmail,
            force_refresh: forceRefresh
          });
          
          if (response.data && response.data.recommendations && response.data.recommendations.length > 0) {
            this.recommendations = response.data.recommendations;
            this.cachedResults = response.data.cached || false;
            this.generatedAt = response.data.generated_at || null;
            
            this.$nextTick(() => {
              if (this.$refs.carouselElement) {
                this.calculateState(this.recommendations.length);
              }
            });
          } else {
            this.error = "Add at least 5 items to your watchlist to get recommendations";
          }
        } catch (error) {
          console.error('Error getting recommendations:', error);
          this.error = "An error occurred while getting your recommendations";
        } finally {
          this.loading = false;
          this.refreshing = false;
        }
      },
      
      async refreshRecommendations() {
        if (this.refreshing) return;
        await this.getRecommendations(true);
      },
      
      getImageUrl(posterPath) {
        if (!posterPath) return this.fallbackImageUrl;
        return `https://image.tmdb.org/t/p/w342${posterPath}`;
      },
      
      handleImageError(event) {
        event.target.src = this.fallbackImageUrl;
      },
      
      getYear(recommendation) {
        const dateStr = recommendation.release_date || recommendation.first_air_date;
        return dateStr ? dateStr.split('-')[0] : '';
      },
      
      calculateStarsWidth(rating) {
        if (!rating) return 0;
        return rating;
      },
      
      formatRating(rating) {
        if (!rating) return '';
        return rating.toFixed(1);
      },
      
      toggleAssociationDetails(index) {
        this.activeAssociationIndex = this.activeAssociationIndex === index ? null : index;
      },
      
      resizeEvent() {
        if (this.recommendations && this.recommendations.length) {
          this.$nextTick(() => {
            if (this.$refs.carouselElement) {
              this.calculateState(this.recommendations.length);
            }
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .listing__head {
    display: flex;
    align-items: center;
  }
  
  .listing__explore {
    margin-left: 1rem;
    font-size: 1.2rem;
    color: #18729f;
    letter-spacing: 0.4px;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .listing__explore {
      font-size: 1.4rem;
    }
  }
  
  .listing__explore:hover,
  .listing__explore:focus {
    opacity: 0.8;
  }
  
  .listing__explore.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .recommendations-loading, 
  .recommendations-error, 
  .empty-recommendations {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    width: 100%;
  }
  
  .loading-message, 
  .error-message, 
  .empty-message {
    text-align: center;
    color: #94999d;
    max-width: 400px;
    font-size: 1.1rem;
  }
  
  .empty-message {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .empty-message svg {
    width: 48px;
    height: 48px;
    stroke: #8BE9FD;
    margin-bottom: 1rem;
  }
  
  .association-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: black;
    border: 3px solid #8BE9FD;
    color: #fff;
    border-radius: 20px;
    height: 20px;
    padding: 3px 8px;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
    z-index: 5;
  }
  
  .association-badge:hover {
    background-color: #d0d0d0;
    color: black;
  }
  
  .association-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 270px;
    background-color: rgba(13, 17, 23, 0.95);
    border-radius: 10px;
    z-index: 10;
    color: white;
    overflow: hidden;
  }
  
  .association-content {
    padding: 15px;
    height: 100%;
    overflow-y: auto;
  }
  
  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .association-content h4 {
    color: #8BE9FD;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1rem;
  }
  
  .association-content p {
    color: #fff;
    font-size: 0.9rem;
    line-height: 1.3;
    margin-bottom: 10px;
  }
  
  .based-on {
    margin-top: 10px;
    font-size: 0.85rem;
  }
  
  .based-on span:first-child {
    color: #8BE9FD;
    display: block;
    margin-bottom: 5px;
  }
  
  .watchlist-items {
    color: #94999d;
  }
  
  .watchlist-items span {
    display: inline;
    margin-right: 3px;
  }
  
  .loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .loading-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #8BE9FD;
    margin: 0 3px;
    animation: loading 1.4s infinite ease-in-out both;
  }
  
  .loading-dot:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  .loading-dot:nth-child(2) {
    animation-delay: -0.16s;
  }
  
  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
  
  /* Estilos heredados de Card para mantener consistencia */
  .card {
    margin: 0 0.5rem;
    transition: transform 0.25s ease-in-out;
    width: 180px;
  }
  
  .card:hover {
    transform: translateY(-0.5rem);
  }
  
  .card__img {
    position: relative;
    height: 0;
    padding-top: 150.27%;
    overflow: hidden;
    backdrop-filter: blur(16px);
    border-start-start-radius: 10px;
    border-start-end-radius: 10px;
    transition: transform 0.3s ease-in-out;
    background-color: #141414;
  }
  
  .card__img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card__name {
    margin-bottom: 1rem;
    overflow: hidden;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: black;
    text-align: center;
    letter-spacing: 0.4px;
    top: -20px;
    position: relative;
  }
  
  .card__rating {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background: black;
    box-shadow: 0 8px 10px 0 rgba(31, 104, 135, 0.37);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    bottom: 10px;
    padding-bottom: 0.5rem;
    position: relative;
    top: -30px;

}
  
.card__stars {
  width: 7.3rem;
  height: 1.2rem;
  background-image: url('~assets/images/stars.png');
  background-repeat: no-repeat;
  background-size: auto 100%;

  > div {
    height: 100%;
    background-image: url('~assets/images/stars-filled.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}

  .card__vote {
    font-size: 1.2rem;
    color: #80868b;
    margin-right: 10px;
    text-align: center;
  }
  
  .card__link {
    display: block;
    color: #fff;
    text-decoration: none;
  }
  </style>