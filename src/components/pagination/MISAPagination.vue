<template>
    <div class="pagination__container">
        <ul class="pagination">
            <li 
                class="pagination__prew" 
                @click="handlePrew"
                :class="{'paginationNonecursor' : pageNumber == 1}"
            >
                {{ this.$_MISAResource['vn-VI'].Pagination.Prew }}
            </li>
            <li v-for="(page, index) in pages" :key="index" 
                class="pagination__item"
                :class="{'pagination__item--active' : page == pageNumber}"
                @click="handleChoosePage(page)"
            >
                {{page}}
            </li>
            <li 
                class="pagination__after" 
                @click="handleAfter"
                :class="{'paginationNonecursor' : pageNumber == totalPages}"
            >
                {{ this.$_MISAResource['vn-VI'].Pagination.After }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "MISAPagination",
    props: ["totalPages", "pageNumber", "handlePrew", "handleAfter", "handleChosePageNumber"],
    computed: {
        /**
         * hiển thị các trang có thể chọn 
         * @author dbkhang 17-07-2023
         */
        pages() {
            let pages = []; //danh sach so trang
            for (let i = 1; i <= this.totalPages; i++) {
                if (i == 1 || i == this.totalPages || (i <= this.pageNumber + 1 && i >= this.pageNumber - 1) ) {
                    pages.push(i)
                } else if (i == this.pageNumber + 2 || i == this.pageNumber - 2) {
                    pages.push("...")
                }
                
            }
            return pages;
        }
    },
    methods: {
        /**
         * hàm chọn số thứ tự trang để hiển thị
         * @param {*} page trang đưuocj chọn
         */
        handleChoosePage(page) {
            if (page != this.pageNumber) {
                this.handleChosePageNumber(page)
            }
        }
    },
}

</script>

<style scoped>
    .pagination {
        display: flex;
        align-items: center;
        margin-right: 24px;
        padding-left: 0;
    }
    .pagination__item {
        padding: 0 6px;
        cursor: pointer;
    }
    .pagination__prew,
    .pagination__after {
        cursor: pointer;
        padding: 0 6px;
    }

    .pagination__prew {
        margin-right: 10px;
    }

    .pagination__after {
        margin-left: 10px;
    }

    .pagination__item--active {
        border: 1px solid gray;
        font-weight: bolder;
    }
    .paginationNonecursor {
        cursor: default;
        color: rgba(26, 25, 25, 0.5);
    }
</style>