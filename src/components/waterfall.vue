<template>
  <div class="waterfall">
    <div
      v-for="(item, i) in arrs"
      :key="item.id + i"
      class="waterfall__item"
      :style="{
        width: `${itemWidth}px`,
        left: `${item.left}px`,
        top: `${item.top}px`
      }"
      @click="$router.push(`/detail/${item.id}`)"
    >
      <div class="waterfall__item-area">
        <img v-if="item.h > textHeight" :src="item.tag" alt="" width="100%">
        <div :style="{ height: `${textHeight - 10}px`, padding: '10px' }">
          <p class="waterfall__item-title">{{ item.title }}</p>
          <p class="waterfall__item-time">{{ item.createdAt | format }}</p>
          <p class="waterfall__item-opt">
            <a href="javascript:;">查看详情</a>
            <span
              v-if="currentUser"
              class="color-error cursor-p"
              @click.stop="$emit('del', item, i)"
            >
              删除
            </span>
          </p>
        </div>
      </div>
    </div>
    <div
      style="position: absolute;text-align: center;padding: 30px 0;width:100%;color:#999;font-size:12px"
      :style="{ top: totalHeight + 'px' }">到底了～</div>
  </div>
</template>

<script>
import { ago } from '../assets/date'
import { summary } from "../assets/util"

export default {
  name: 'waterfall',
  data() {
    return {
      column: 0,
      itemWidth: 0,
      arrs: [],
      docWidth: 0,
      totalHeight: 0
    }
  },
  filters: {
    format(str) {
      let res
      Date.prototype.ago = ago
      res = new Date().ago(str)
      Date.prototype.ago = null
      return res
    },
    summary
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    currentUser: Boolean,
    textHeight: {
      type: Number,
      default: 115
    }
  },
  watch: {
    items() {
      if (this.docWidth) {
        this.init()
      }
    }
  },
  mounted() {
    this.docWidth = document.body.clientWidth
    if (this.items.length) {
      this.init()
    }
  },
  methods: {
    initImgHeight (url) {
      return new Promise((resolve, reject) => {
        if (/^http:/.test(url)) {
          const img = new Image()
          img.src = url
          img.onload = () => {
            resolve(Math.floor(img.height * (this.itemWidth / img.width)))
          }
          img.onerror = () => {
            reject()
          }
        } else {
          reject()
        }
      })
    },
    async init() {
      const width = this.docWidth
      if (width < 600) {
        this.column = 1
      } else if (width < 1000) {
        this.column = 4
      } else if (width < 1400) {
        this.column = 5
      } else {
        this.column = 7
      }
      this.itemWidth = Math.floor(width / this.column)
      for (let i = 0; i < this.items.length; i++) {
        const it = this.items[i]
        it.h = await this.initImgHeight(it.tag).catch(() => 0) + this.textHeight
      }
      // 遍历排版
      const hArr = []
      const result = []
      for (let i = 0; i < this.items.length; i++) {
        const it = this.items[i]
        if (i < this.column) {
          hArr.push(it.h)
          it.top = 0
          it.left = this.itemWidth * i
        } else {
          const minH = Math.min.apply(null, hArr)
          const minI = hArr.findIndex(x => x === minH)
          it.top = minH
          it.left = minI * this.itemWidth
          hArr[minI] += it.h
        }
        result.push({ ...it })
      }
      this.arrs = result
      // const remainFour = result.slice(result.length >= 4 ? result.length - 4 : 0, result.length).map(x => x.h)
      this.totalHeight = Math.max.apply(null, hArr)
        // + Math.max.apply(null, remainFour)
    }
  }
}
</script>

<style lang="less">
.waterfall {
  position: relative;
  &__item {
    position: absolute;
    padding: 10px;
    &-area {
      background-color: #fff;
    }
    &-title {
      font-size: 16px;
      word-break: break-all;
    }
    &-time {
      color: #999;
      font-size: 12px;
      margin: 5px 0;
    }
    &-opt {
      display: flex;
      align-items: center;
      font-size: 12px;
      justify-content: space-between;
    }
  }
}
</style>
